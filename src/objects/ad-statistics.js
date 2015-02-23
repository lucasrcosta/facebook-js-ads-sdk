(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/data-object',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdStatistics', dependencies, factory);
}(this, function(DataObject) {
  'use strict';

  var endpoint = 'stats';
  var fields = [];

  /**
   * Group of Ad Sets
   * @see {@link}         https://developers.facebook.com/docs/marketing-api/adstatistics
   * @param {FacebookAdsApi}  api
   * @param {mixed}       initData
   * @extends DataObject
   * @class
   */
  function AdStatistics(api, initData) {
    var _this = new DataObject(Object.keys(initData), initData);

    return _this;
  }

  AdStatistics.getEndpoint = function() { return endpoint; };
  AdStatistics.getFields = function() { return fields; };

  return AdStatistics;
}));
