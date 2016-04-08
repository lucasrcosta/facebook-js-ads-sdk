(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/cannot-create',
    './mixins/cannot-update',
    './mixins/cannot-delete'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdUser', dependencies, factory);
}(this, function(CrudObject, CannotCreate, CannotUpdate, CannotDelete) {
  'use strict';

  var endpoint = 'users';
  var fields = [
    'id',
    'name',
    'permissions',
    'role',
  ];

  /**
   * Users authorized to access and manage the Ad Account
   * @see   {@link}           https://developers.facebook.com/docs/marketing-api/aduser
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @extends CrudObject
   * @class
   */
  function AdUser(api, initData) {
    var _this = new CrudObject(api, endpoint, fields, initData);
    CannotCreate.call(_this);
    CannotUpdate.call(_this);
    CannotDelete.call(_this);

    /**
     * Overriding for connected object creation
     * @return {string}
     */
    _this.getParentId = _this.getId;

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdAccounts = function(fields, params) {
      return _this.getManyByConnection(api.AdAccount, fields, params);
    };

    return _this;
  }

  AdUser.getEndpoint = function() { return endpoint; };
  AdUser.getFields = function() { return fields; };

  return AdUser;
}));
