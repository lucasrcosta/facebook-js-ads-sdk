if (typeof require === 'function')
  var Promise = require('promise');

(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['data-object'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./data-object.js'));
  } else {
    root.FbApiAssets.coreObjects.CrudObject = factory(root.FbApiAssets.coreObjects.DataObject);
  }
}(this, function(DataObject) {
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

    if (!endpoint)
      throw new Error('A crud object needs an endpoint');

    fields = fields || ['id'];
    initData = initData || {};
    if (initData && typeof initData != 'object')
      initData = {id: initData};

    var _this = new DataObject(fields, initData);

    /**
     * @return {facebookadsapi}
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
     * @throws {error} if object has no id
     * @return {mixed]}
     */
    _this.getId = function() {
      if (_this.id !== 0 && !_this.id)
        throw new Error('ID not defined');
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
     * @param {array} [filter] selected fields
     * @param {object} [params] additional params
     * @throws {error} if graph promise is rejected
     * @return _this
     */
    _this.read = function(filter, params) {
      var path = _this.getNodePath();
      filter = filter || fields;
      params = params || {};
      params.fields = filter;
      return new Promise(function(resolve, reject) {
        api.graph.get(path, params)
          .then(function(data) {
            resolve(_this.setData(data, true));
          })
          .catch(function(err) { reject(err); });
      });
    };

    /**
     * Create an object on the graph
     * @param {object} params additional params
     * @throws {error} if graph promise is rejected
     * @return _this
     */
    _this.create = function(params) {
      if (_this.id)
        throw new Error('Object already has an ID. Try updating.');

      var path = _this.getParentId() + '/' + _this.getEndpoint();
      var data = _this.getData();
      return new Promise(function(resolve, reject) {
        api.graph.post(path, params, data)
          .then(function(data) {
            resolve(_this.setData(data, true));
          })
          .catch(function(err) { reject(err); });
      });
    };

    return _this;
  }

  return CrudObject;
}));
