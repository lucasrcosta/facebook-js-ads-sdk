(function(root) {
  'use strict';

  var FacebookAdsApi;

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @param {string} endpoint
   * @param {array} fields
   * @param {Object} initData
   * @extends DataObject
   * @class
   */
  function CrudObject(endpoint, fields, initData) {
    var _this = new FacebookAdsApi.DataObject(initData);
    _this.fields = makeFieldsObject(fields);

    /**
     * @return {string}
     */
    _this.getEndpoint = function() {
      return endpoint;
    };

    /**
     * Make fields object from fields array
     * @param  {array} fields
     * @return {Object}
     */
    function makeFieldsObject(fields) {
      var fieldsObj = {};
      for (var i = 0; i < fields.length; i++) {
        fieldsObj[fields[i]] = fields[i];
      }
      return Object.freeze(fieldsObj);
    }

    return _this;
  }

  // Module
  if (typeof module !== 'undefined') {
    FacebookAdsApi = module.parent.exports;
    module.exports = CrudObject;
  } else {
    root.FacebookAdsApi.CrudObject = CrudObject;
    FacebookAdsApi = root.FacebookAdsApi;
  }
})(this);
