(function(root) {
  "use strict";

  /**
   * Data Object
   * Manages object data and provides matching object properties
   * @class
   */
  function DataObject(data) {
    var _this = this,
      ownPublicMethods = [],
      dataFields = [],
      persistedData = {};

    if(data) setData(data);

    /**
     * @param {Object} newData
     * @returns this
     */
    function setData(newData) {
      if (!ownPublicMethods.length) setOwnPublicMethods();
      var properties = Object.keys(newData);
      dataFields = [];
      for (var i = properties.length - 1; i >= 0; i--) {
        var prop = properties[i];
        if (ownPublicMethods.indexOf(prop) >= 0)
          throw new Error('Data contains a public method conflicting property', prop);
        _this[prop] = newData[prop];
        dataFields.push(prop);
      }
      persistedData = newData;
      return _this;
    };
    this.setData = setData;

    /**
     * Set single property
     * @param {string} name
     * @param {mixed} value
     * @returns this
     */
    function set(name, value) {
      if (!ownPublicMethods.length) setOwnPublicMethods();
      if (ownPublicMethods.indexOf(name) >= 0)
        throw new Error('Property conflicts with a public method', name);
      dataFields.push(name);
      _this[name] = persistedData[name] = value;
      return _this;
    }
    this.set = set;

    /**
     * Get current object data
     * @return {Object}
     * @param {array} [fields]
     */
    function getData(fields) {
      fields = fields || dataFields;
      var data = {};
      for (var i = fields.length - 1; i >= 0; i--) {
        if (_this[fields[i]] != undefined) data[fields[i]] = _this[fields[i]];
        else console.warn('Inexistent property ', fields[i]);
      }
      return data;
    };
    this.getData = getData;

    /**
     * @return {Object}
     */
    function getPersistedData() {
      return persistedData;
    };
    this.getPersistedData = getPersistedData;

    /**
     * Shallow comparisson between persisted data and current data
     * @return {Object}
     */
    function getChangedData() {
      var changedData = {};
      for (var i = dataFields.length - 1; i >= 0; i--) {
        if (_this[dataFields[i]] != persistedData[dataFields[i]])
          changedData[dataFields[i]] = _this[dataFields[i]];
      }
      return changedData;
    };
    this.getChangedData = getChangedData;

    /**
     * Persist current data
     * @return {Object} this
     */
    function persistData() {
      for (var i = dataFields.length - 1; i >= 0; i--) {
        persistedData[dataFields[i]] = _this[dataFields[i]];
      }
      return _this;
    };
    this.persistData = persistData;

    /**
     * Reset data to persisted state
     * @return {Object} this
     */
    function resetData() {
      for (var i = dataFields.length - 1; i >= 0; i--) {
        _this[dataFields[i]] = persistedData[dataFields[i]];
      }
      return _this;
    };
    this.resetData = resetData;

    /**
     * Set object's methods array for conflict prevention
     */
    function setOwnPublicMethods() {
      for (var prop in _this) {
        if (typeof _this[prop] == 'function') ownPublicMethods.push(prop);
      }
    }

    return this;
  };

  // Module
  if (typeof module !== 'undefined') module.exports = DataObject;
  else root.FacebookAdsApi.DataObject = DataObject;
})(this);