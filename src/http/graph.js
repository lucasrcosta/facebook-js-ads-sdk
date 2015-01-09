(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['http'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./http.js'));
  } else {
    root.FbApiAssets.http.Graph = factory(root.FbApiAssets.http.Http);
  }
}(this, function(Http) {
  'use strict';

  /**
   * Facebook Graph requests
   * @param {FacebookAdsApi} api
   * @type {object}
   */
  function Graph(api) {
    var _this = {};
    var url = 'https://graph.facebook.com/';
    _this.http = new Http();

    /**
     * Get Graph Request
     * @param {string} path
     * @param {object} params
     * @return {promise}
     */
    _this.get = function(path, params) {
      var requestUrl = _this.getRequestUrl(path);
      params = params || {};
      params.access_token =  api.getToken();
      params.locale =  api.getLocale();
      requestUrl += '?' + encodeParams(params);
      return _this.http.getJSON(requestUrl);
    };

    /**
     * URL, version and enpoint
     * @param {string} path
     * @return {string}
     */
    _this.getRequestUrl = function(path) {
      return url + 'v' + api.getVersion() + '/' + path;
    };

    /**
     * Facebook Graph Url
     * @return {string}
     */
    _this.getGraphUrl = function() {
      return url;
    };

    /**
     * Encode parameter object as querystring
     * @param {object} params
     * @return {string} querystring
     */
    function encodeParams(params) {
      return Object.keys(params).map(function(param) {
        return param + '=' + params[param];
      }).join('&');
    }

    return _this;
  }

  return Graph;
}));
