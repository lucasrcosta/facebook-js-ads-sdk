(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/cannot-update'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdImage', dependencies, factory);
}(this, function(CrudObject, CannotUpdate) {
  'use strict';

  var endpoint = 'adimages';
  var fields = [
    'id',
    'hash',
    'url',
    'creatives',
    'filename',
    'width',
    'height',
    'original_width',
    'original_height',
  ];

  /**
   * Images for use in Ad Creatives
   * @see   {@link}           https://developers.facebook.com/docs/marketing-api/adimage
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [parentId]  Account Id
   * @extends CrudObject
   * @class
   */
  function AdImage(api, initData, parentId) {
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);
    CannotUpdate.call(_this);

    return _this;
  }

  AdImage.getEndpoint = function() { return endpoint; };
  AdImage.getFields = function() { return fields; };

  return AdImage;
}));
