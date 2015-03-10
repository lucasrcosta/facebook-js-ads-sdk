(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/data-object',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.ConnectionObject', dependencies, factory);
}(this, function(DataObject) {
  'use strict';

  var endpoint = 'connectionobjects';
  var fields = [
    'app_installs_tracked',
    'id',
    'is_game',
    'name',
    'native_app_store_ids',
    'native_app_targeting_ids',
    'object_store_urls',
    'og_namespace',
    'og_actions',
    'og_object',
    'picture',
    'supported_platforms',
    'tabs',
    'type',
    'url',
  ];

  /**
   * Facebook objects (e.g. pages, apps, etc) which the Ad user is an administrator, developer or advertiser
   * @see {@link}         https://developers.facebook.com/docs/marketing-api/connectionobjects
   * @param {FacebookAdsApi}  api
   * @param {mixed}       initData
   * @extends DataObject
   * @class
   */
  function ConnectionObject(api, initData) {
    var _this = new DataObject(Object.keys(initData), initData);

    return _this;
  }

  ConnectionObject.getEndpoint = function() { return endpoint; };
  ConnectionObject.getFields = function() { return fields; };

  return ConnectionObject;
}));
