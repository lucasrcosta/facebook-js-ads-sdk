(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/data-object',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdPreview', dependencies, factory);
}(this, function(DataObject) {
  'use strict';

  var endpoint = 'previews';
  var fields = [
    'creative',
    'post',
    'ad_format',
    'body',
    'product_item_ids',
  ];

  /**
   * Preview existing ad groups and planned ad groups
   * @see {@link}         https://developers.facebook.com/docs/marketing-api/generatepreview
   * @param {FacebookAdsApi}  api
   * @param {mixed}       initData
   * @extends DataObject
   * @class
   */
  function AdPreview(api, initData) {
    var _this = new DataObject(Object.keys(initData), initData);

    return _this;
  }

  AdPreview.getEndpoint = function() { return endpoint; };
  AdPreview.getFields = function() { return fields; };

  return AdPreview;
}));
