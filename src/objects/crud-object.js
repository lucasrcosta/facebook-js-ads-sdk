(function(root) {
  'use strict';

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @param {FacebookAdsApi} api
   * @param {string} endpoint
   * @param {array} fields
   * @param {mixed} [initData]
   * @param {int} [parentId] for new object creation
   * @extends DataObject
   * @class
   */
  function CrudObject(api, endpoint, fields, initData, parentId) {
    fields = fields || ['id'];
    initData = initData || {};
    if (initData && typeof initData != 'object')
      initData = {id: initData};

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

    /**
     * @return {mixed}
     */
    _this.getParentId = function() {
      return parentId;
    };

    /**
     * @param {mixed} newParentId
     * @return _this
     */
    _this.setParentId = function(newParentId) {
      parentId = newParentId;
      return _this;
    };

    /**
     * @throws {Error} if object has no id
     * @return {mixed]}
     */
    _this.getId = function() {
      if (_this.id !== 0 && !_this.id)
        throw new Error('id not defined');
      return _this.id;
    };

    /**
     * @return {string}
     */
    _this.getNodePath = function() {
      return _this.getId();
    };

    /**
     * Read object data from the graph
     * @param  {array} [filter] selected fields
     * @param  {Object} [params] additional params
     * @throws {Error} if graph promise is rejected
     * @return _this
     */
    _this.read = function(filter, params) {
      filter = filter || fields;
      params = params || {};
      params.fields = filter;
      return new Promise(function(resolve, reject) {
        api.graph.get(_this.getNodePath(), params)
        .then(function(data) {
          resolve(_this.setData(data));
        })
        .catch(function(err) { reject(err); });
      });
    };

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
