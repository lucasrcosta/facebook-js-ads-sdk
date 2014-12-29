(function(root) {
  'use strict';

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @param {FacebookAdsApi} api
   * @param {string} endpoint
   * @param {array} fields
   * @param {Object} [initData]
   * @extends DataObject
   * @class
   */
  function CrudObject(api, endpoint, fields, initData) {
    var _this = new FacebookAdsApi.objects.DataObject(fields, initData);

    /**
     * @return {FacebookAdsApi}
     */
    _this.getApi = function() {
      return api;
    };

    /**
     * @return {string}
     */
    _this.getEndpoint = function() {
      return endpoint;
    };

    _this.read = function() {
      return api.graph.get(assureId());
    };

    function assureId() {
      if (!_this.id)
        throw new Error('id is required');
      return _this.id;
    }

    return _this;
  }

  // Module
  var FacebookAdsApi;
  if (typeof module !== 'undefined') {
    FacebookAdsApi = module.parent.exports;
    module.exports = CrudObject;
  } else {
    root.FacebookAdsApi.objects.CrudObject = CrudObject;
    FacebookAdsApi = root.FacebookAdsApi;
  }
})(this);
