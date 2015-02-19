(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Core.DataObject', dependencies, factory);
}(this, function() {
  'use strict';

  /**
   * Data Object
   * Manages object data fields and provides matching properties
   * @param {array} fields
   * @param {object} [initData]
   * @class
   */
  function DataObject(fields, initData) {
    if (!fields)
      throw new Error('A data object needs fields');

    var _this = {};
    var persistedData = {};

    _this.fields = createFieldsObject(fields);

    /**
     * Get data fields
     * @return {array}
     */
    _this.getFields = function() {
      return fields;
    };

    /**
     * Set single data field
     * @param {string} field
     * @param {mixed} value
     * @return _this
     */
    _this.set = function(field, value) {
      if (fields.indexOf(field) < 0)
        throw Error(field + ' is not one of this object\'s fields');
      _this[field] = value;
      return _this;
    };

    /**
     * @param {object} newData
     * @param {boolean} persist
     * @return _this
     */
    _this.setData = function(newData, persist) {
      var keys = Object.keys(newData);
      for (var i = 0; i < keys.length; i++)
        _this.set(keys[i], newData[keys[i]]);
      if (persist)
        _this.persistData();
      return _this;
    };

    /**
     * Get current object data
     * @return {object}
     */
    _this.getData = function() {
      var data = {};
      for (var i = 0; i < fields.length; i++) {
        if (_this[fields[i]])
          data[fields[i]] = _this[fields[i]];
      }
      return data;
    };

    /**
     * Persist current data
     * @return {object} this
     */
    _this.persistData = function() {
      for (var i = 0; i < fields.length; i++) {
        var current = _this[fields[i]];
        if (current instanceof Array)
          persistedData[fields[i]] = current.slice();
        else if (typeof current == 'object' && current)
          persistedData[fields[i]] = deepExtend({}, current);
        else
          persistedData[fields[i]] = current;
      }
      return _this;
    };

    /**
     * Reset data to persisted state
     * @return {object} this
     */
    _this.resetData = function() {
      for (var i = 0; i < fields.length; i++) {
        var persisted = persistedData[fields[i]];
        if (persisted instanceof Array)
          _this[fields[i]] = persisted.slice();
        else if (typeof persisted == 'object' && persisted)
          _this[fields[i]] = deepExtend({}, persisted);
        else
          _this[fields[i]] = persisted;
      }
      return _this;
    };

    /**
     * @return {object}
     */
    _this.getPersistedData = function() {
      return persistedData;
    };

    /**
     * Shallow comparisson between persisted data and current data
     * @return {object}
     */
    _this.getChangedData = function() {
      var changedData = {};
      for (var i = 0; i < fields.length; i++) {
        var current = _this[fields[i]];
        var persisted = persistedData[fields[i]];
        if (!isEqual(current, persisted))
          changedData[fields[i]] = current;
      }
      return changedData;
    };

    /**
     * Create fields object from fields array
     * @param {array} fields
     * @return {object}
     */
    function createFieldsObject(fields) {
      var fieldsObj = {};
      for (var i = 0; i < fields.length; i++) {
        fieldsObj[fields[i]] = fields[i];
      }
      return Object.freeze(fieldsObj);
    }

    /**
     * Deep Extend
     * @param  {object} out object to be extended
     * @param  {...object}  list of objects to extended
     * @return {object}     extended object
     */
    function deepExtend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && !(obj[key] instanceof Array))
              deepExtend(out[key], obj[key]);
            else
              out[key] = obj[key];
          }
        }
      }
      return out;
    }

    /**
     * Compares two mixed objects
     * @return {Boolean}
     */
    function isEqual(a, b) {
      if (a instanceof Array)
        return b instanceof Array && isEqualArray(a, b);
      else if (a && typeof a == 'object')
        return b && typeof b == 'object' && isEqualObjects(a, b);
      return a === b;
    }

    /**
     * Compares two arrays
     * @return {Boolean}
     */
    function isEqualArray(a, b) {
      if (a.length !==  b.length) return false;
      for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
          return false;
      }
      return true;
    }

    /**
     * Compares two objects
     * @return {Boolean}
     */
    function isEqualObjects(a, b) {
      var keys = Object.keys(a);
      for (var i = 0; i < keys.length; i++) {
        if (!isEqual(a[keys[i]], b[keys[i]]))
          return false;
      }
      return true;
    }

    // Set initial data
    if (initData)
      _this.setData(initData);

    return _this;
  }

  return DataObject;
}));
