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
     * Read object data
     * @param {array} [filter] selected fields
     * @param {object} [params] additional params
     * @throws {error} if graph promise is rejected
     * @return {promise} resolves to {object} _this
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
          .catch(reject);
      });
    };

    /**
     * Create alias for save
     * @param {object} params additional params
     * @throws {error} if object already has an ID
     * @return {promise} resolves to {object} _this
     */
    _this.create = function(params) {
      if (_this.id)
        throw new Error('Object already has an ID. Try updating.');
      return upsert(params);
    };

    /**
     * Update alias for save
     * @param {object} params additional params
     * @throws {error} if object has no ID
     * @return {promise} resolves to {object} _this
     */
    _this.update = function(params) {
      if (!_this.id)
        throw new Error('Object has no ID. Try creating.');
      return upsert(params);
    };

    /**
     * Delete object
     * @return {promise} resolves to {object} _this
     */
    _this.delete = function() {
      var path = _this.getNodePath();
      return api.graph.delete(path);
    };

    /**
     * Create or Update alias
     * @param {object} params additional params
     * @return {promise} resolves to {object} _this
     */
    _this.save = function(params) {
      if (_this.id)
        return _this.update(params);
      return _this.create(params);
    };

    /**
     * Create or Update object
     * @param {object} params additional params
     * @return {promise} resolves to {object} _this
     */
    function upsert(params) {
      var path;
      var data = _this.getData();

      if (_this.id)
        path = _this.getNodePath(); // Update
      else
        path = _this.getParentId() + '/' + _this.getEndpoint(); // Create

      return new Promise(function(resolve, reject) {
        api.graph.post(path, params, data)
          .then(function(data) {
            if (data.success)
              resolve(data);
            else
              resolve(_this.setData(data, true));
          })
          .catch(reject);
      });
    }

    return _this;
  }

  return CrudObject;
}));
