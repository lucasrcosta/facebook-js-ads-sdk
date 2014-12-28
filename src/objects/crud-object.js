(function(root) {
  'use strict';

  var FacebookAdsApi;

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @param {string} endpoint
   * @param {array} fields
   * @param {Object} [initData]
   * @extends DataObject
   * @class
   */
  function CrudObject(endpoint, fields, initData) {
    var _this = new FacebookAdsApi.DataObject(fields, initData);

    /**
     * @return {string}
     */
    _this.getEndpoint = function() {
      return endpoint;
    };

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
