(function(root) {
  'use strict';

  /**
   * Data Object
   * Manages object data and provides matching properties
   * @param {Object} initData
   * @class
   */
  function DataObject(initData) {
    var _this = {};
    var ownPublicMethods = [];
    var fields = [];
    var persistedData = {};

    /**
     * @param {Object} newData
     * @return _this
     */
    _this.setData = function(newData) {
      if (!ownPublicMethods.length) setOwnPublicMethods();
      var newDataFields = Object.keys(newData);
      for (var i = 0; i < newDataFields.length; i++) {
        var dataField = newDataFields[i];
        var field = getSafeFieldName(dataField);
        _this[field] = newData[dataField];
        fields.push(field);
      }
      persistedData = newData;
      return _this;
    };

    /**
     * Set single data field
     * @param {string} field
     * @param {mixed} value
     * @return _this
     */
    _this.set = function(field, value) {
      if (!ownPublicMethods.length) setOwnPublicMethods();
      field = getSafeFieldName(field);
      fields.push(field);
      _this[field] = persistedData[field] = value;
      return _this;
    };

    /**
     * Get current object data
     * @param {array} [fieldsFilter]
     * @return {Object}
     */
    _this.getData = function(fieldsFilter) {
      var selectedFields = fieldsFilter || fields;
      var data = {};
      for (var i = selectedFields.length - 1; i >= 0; i--) {
        var field = selectedFields[i];
        if (_this[field] !== undefined) data[field] = _this[field];
        else console.warn('Inexistent field ', field);
      }
      return data;
    };

    /**
     * Get current object data fields
     * @return {array}
     */
    _this.getFields = function() {
      return fields;
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
     * Set object's methods array for conflict prevention
     */
    function setOwnPublicMethods() {
      for (var prop in _this) {
        if (typeof _this[prop] == 'function') ownPublicMethods.push(prop);
      }
    }

    /**
     * Return field name that doesn't conflict with public methods
     * @param  {string} field
     * @param  {string} original field name
     * @return {string}
     */
    function getSafeFieldName(field, original) {
      var ajusted = original;
      original = original || field;
      if (ownPublicMethods.indexOf(field) >= 0) return getSafeFieldName('_' + field, original);
      if (ajusted) console.warn('Public method conflict. Property "' + original + '" renamed to "' + field + '"');
      return field;
    }

    // Set initial data
    if (initData)
      _this.setData(initData);

    return _this;
  }

  // Module
  if (typeof module !== 'undefined') module.exports = DataObject;
  else root.FacebookAdsApi.DataObject = DataObject;
})(this);
