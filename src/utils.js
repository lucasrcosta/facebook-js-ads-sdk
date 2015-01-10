(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.Utils = factory();
  }
}(this, function() {
  'use strict';

  /**
   * Encode parameter object as querystring
   * @param {object} params
   * @return {string} querystring
   */
  function encodeParams(params) {
    return Object.keys(params).map(function(param) {
      return param + '=' + encodeURIComponent(params[param]);
    }).join('&');
  }

  return {
    encodeParams: encodeParams
  };
}));
