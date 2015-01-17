(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Utils.Utils', dependencies, factory);
}(this, function() {
  'use strict';

  var _this = {};
  /**
   * Encode parameter object as querystring
   * @param {object} params
   * @return {string} querystring
   */
  _this.encodeParams = function(params) {
    return Object.keys(params).map(function(param) {
      if (params[param] instanceof Array)
        params[param] = '["' + params[param].toString() + '"]';
      return param + '=' + encodeURIComponent(params[param]);
    }).join('&');
  };

  return _this;
}));
