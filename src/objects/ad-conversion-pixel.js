(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdConversionPixel', dependencies, factory);
}(this, function(CrudObject) {
  'use strict';

  var endpoint = 'offsitepixels';
  var fields = [
    'id',
    'name',
    'tag',
    'status',
    'creator',
    'js_pixel',
    'value',
  ];

  /**
   * Used to signal events that happened while the user was browsing your website like viewing a product, registering or even adding a product to his cart
   * @see {@link} https://developers.facebook.com/docs/marketing-api/offsite-pixels
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function AdConversionPixel(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    var parentRead = _this.read;

    /**
     * Remove value from read
     * @param   {array}   [filter] selected fields
     * @param   {object}  [params] additional params
     * @throws  {error}   if graph promise is rejected
     * @return  {promise} resolves to {object} _this
     */
    _this.read = function(filter, params) {
      filter = filter || fields;
      var valueIndex = filter.indexOf('value');
      if (valueIndex >= 0)
        filter.splice(valueIndex, 1);
      return parentRead(filter, params);
    };

    return _this;
  }

  AdConversionPixel.getEndpoint = function() { return endpoint; };
  AdConversionPixel.getFields = function() { return fields; };

  return AdConversionPixel;
}));
