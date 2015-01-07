(function(root) {
  'use strict';

  /**
   * Data Object
   * Manages object data fields and provides matching properties
   * @param {array} fields
   * @param {Object} [initData]
   * @class
   */
  function DataObject(fields, initData) {
    if (!fields)
      throw new Error('a data object needs fields');

    var _this = createObjectFromFields(fields);
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
      _this[field] = persistedData[field] = value;
      return _this;
    };

    /**
     * @param {Object} newData
     * @return _this
     */
    _this.setData = function(newData) {
      var keys = Object.keys(newData);
      for (var i = keys.length - 1; i >= 0; i--)
        _this.set(keys[i], newData[keys[i]]);
      return _this;
    };

    /**
     * Get current object data
     * @return {Object}
     */
    _this.getData = function() {
      var data = {};
      for (var i = fields.length - 1; i >= 0; i--)
          data[fields[i]] = _this[fields[i]];
      return data;
    };

    /**
     * @return {Object}
     */
    _this.getPersistedData = function() {
      return persistedData;
    };

    /**
     * Shallow comparisson between persisted data and current data
     * @return {Object}
     */
    _this.getChangedData = function() {
      var changedData = {};
      for (var i = fields.length - 1; i >= 0; i--) {
        if (_this[fields[i]] != persistedData[fields[i]])
          changedData[fields[i]] = _this[fields[i]];
      }
      return changedData;
    };

    /**
     * Persist current data
     * @return {Object} this
     */
    _this.persistData = function() {
      for (var i = fields.length - 1; i >= 0; i--) {
        persistedData[fields[i]] = _this[fields[i]];
      }
      return _this;
    };

    /**
     * Reset data to persisted state
     * @return {Object} this
     */
    _this.resetData = function() {
      for (var i = fields.length - 1; i >= 0; i--) {
        _this[fields[i]] = persistedData[fields[i]];
      }
      return _this;
    };

    /**
     * Create object with fields as properties
     * @param  {array} fields
     * @return {Object}
     */
    function createObjectFromFields(fields) {
      var obj = {};
      for (var i = fields.length - 1; i >= 0; i--) {
        obj[fields[i]] = null;
      }
      return obj;
    }

    /**
     * Create fields object from fields array
     * @param  {array} fields
     * @return {Object}
     */
    function createFieldsObject(fields) {
      var fieldsObj = {};
      for (var i = 0; i < fields.length; i++) {
        fieldsObj[fields[i]] = fields[i];
      }
      return Object.freeze(fieldsObj);
    }

    // Set initial data
    if (initData)
      _this.setData(initData);

    return _this;
  }

  // Module
  if (typeof module !== 'undefined') module.exports = DataObject;
  else root.FacebookAdsApi.objects.DataObject = DataObject;
})(this);
