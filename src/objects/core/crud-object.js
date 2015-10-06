if (typeof exports === 'object')
    var Promise = require('promise');
(function(root, factory) {
  'use strict';
  var dependencies = [
    './data-object',
    './collection',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Core.CrudObject', dependencies, factory);
}(this, function(DataObject, Collection) {
  'use strict';

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @param {FacebookAdsApi}  api
   * @param {string}          endpoint
   * @param {array}           fields
   * @param {mixed}           [initData] string will be converted to id property
   * @param {string}          [parentId] for new object creation
   * @extends DataObject
   * @class
   */
  function CrudObject(api, endpoint, fields, initData, parentId) {
    if (!endpoint)
      throw new Error('A crud object needs an endpoint');

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
      if (parentId !== 0 && !parentId)
        throw new Error('parentId not defined');
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
     * @return {string}
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
     * Create new object
     * @param   {object}  params additional params
     * @throws  {error}   if object already has an ID
     * @return  {promise} resolves to {object} _this
     */
    _this.create = function(params) {
      if (_this.id)
        throw new Error('Object already has an ID. Try updating.');
      var path = _this.getParentId() + '/' + _this.getEndpoint();
      var data = _this.getChangedData();
      return new Promise(function(resolve, reject) {
        api.graph.post(path, data, params)
          .then(function(data) {
            if (data.success) // Validation
              resolve(data);
            else
              resolve(_this.setData(data, true));
          })
          .catch(reject);
      });
    };

    /**
     * Read object data
     * @param   {array}   [fields]
     * @param   {object}  [params] additional params
     * @throws  {error}   if graph promise is rejected
     * @return  {promise} resolves to {object} _this
     */
    _this.read = function(fields, params) {
      var path = _this.getNodePath();
      params = params || {};
      if (fields) {
        checkFilter(_this, fields);
        params.fields = fields;
      }
      return new Promise(function(resolve, reject) {
        api.graph.get(path, params)
          .then(function(data) {
            resolve(_this.setData(data, true));
          })
          .catch(reject);
      });
    };

    /**
     * Update object
     * @param   {object}  [params] additional params
     * @throws  {error}   if object has no ID
     * @return  {promise} resolves to {object} _this
     */
    _this.update = function(params) {
      if (!_this.id)
        throw new Error('Object has no ID. Try creating.');
      var path = _this.getNodePath();
      var data = _this.getChangedData();
      return new Promise(function(resolve, reject) {
        api.graph.post(path, data, params)
          .then(function(data) {
            var isValidation = params && params.execution_options && params.execution_options[0] && params.execution_options[0] == 'validate_only';
            if (!isValidation)
              _this.persistData();
            resolve(data);
          })
          .catch(reject);
      });
    };

    /**
     * Delete object
     * @param   {object}  [params] additional params
     * @return {promise} resolves to {object} _this
     */
    _this.delete = function(params) {
      var path = _this.getNodePath();
      return api.graph.delete(path, params);
    };

    /**
     * Create or Update alias
     * @param   {object}  params additional params
     * @return  {promise} resolves to {object} _this
     */
    _this.save = function(params) {
      if (_this.id)
        return _this.update(params);
      return _this.create(params);
    };

    /**
     * Read connected objects
     * @param   {CrudObject}  ObjClass
     * @param   {array}       fields     fields
     * @param   {object}      params
     * @param   {string}      [endpoint]
     * @return  {promise}
     * @resolve {Collection}
     */
    _this.getManyByConnection = function(ObjClass, fields, params, endpoint) {
      return new Promise(function(resolve, reject) {
        fetchConnection(ObjClass, fields, params, endpoint)
          .then(function(response) {
            var collection = new Collection(ObjClass, _this.getParentId(), response);
            resolve(collection);
          })
        .catch(reject);
      });
    };

    /**
     * Read connected object
     * @param   {CrudObject}  ObjClass
     * @param   {array}       fields     fields
     * @param   {object}      params
     * @param   {string}      [endpoint]
     * @return  {promise}
     * @resolve {object}
     */
    _this.getOneByConnection = function(ObjClass, fields, params, endpoint) {
      return new Promise(function(resolve, reject) {
        fetchConnection(ObjClass, fields, params, endpoint)
          .then(function(data) {
            var connectedObj = new ObjClass(data, _this.getParentId());
            resolve(connectedObj);
          })
        .catch(reject);
      });
    };

    /**
     * Read objects from connection
     * @param  {CrudObject} ObjClass
     * @param  {array}  fields     fields
     * @param  {object} params
     * @param  {string} [endpoint]
     * @return {promise}
     */
    function fetchConnection(ObjClass, fields, params, endpoint) {
      if (!endpoint && !ObjClass.getEndpoint)
        throw new Error('Endpoint must be given or provided by ObjClass');
      endpoint = endpoint || ObjClass.getEndpoint();
      params = params || {};
      if (fields) {
        checkFilter(ObjClass, fields);
        params.fields = fields;
      }
      var path = _this.getId() + '/' + endpoint;
      return api.graph.get(path, params);
    }

    /**
     * Check if filter fields are in the fields array
     * @param  {object} ObjClass
     * @param  {array}  fields
     * @throws {error}  if a field is not found
     */
    function checkFilter(ObjClass, fields) {
      var default_fields = ObjClass.getFields();
      for (var field in fields) {
        if (default_fields.indexOf(fields[field]) < 0)
          throw new Error('"' + fields[field] + '"" is not a field of this object');
      }
    }

    return _this;
  }

  return CrudObject;
}));
