(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.Utils.Utils = factory();
  }
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

  _this.makeOjectsArray = function(ObjClass, data) {
    var objArray = [];
    for (var i = data.length - 1; i >= 0; i--) {
      objArray.push(new ObjClass(data[i]));
    }
    return objArray;
  };

  return _this;
}));
