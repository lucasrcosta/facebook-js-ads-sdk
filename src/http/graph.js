(function(root, factory) {
  'use strict';
  var dependencies = [
    './xml-http-request'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') {
    dependencies[0] = './http';
    module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  }
  else root.FacebookAdsApi.define('Http.Graph', dependencies, factory);
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

    /**
     * Get Graph Request
     * @param {string} path
     * @param {object} params
     * @return {promise}
     */
    _this.get = function(path, params) {
      var requestUrl = _this.getRequestUrl(path, params);
      return Http.get(requestUrl);
    };

    /**
     * Post Graph Request
     * @param {string}  path
     * @param {object}  data
     * @param {object}  params
     * @param {bool}    [encodeData] default true
     * @return {promise}
     */
    _this.post = function(path, data, params, encodeData) {
      if (encodeData !== false)
        data = encodeParams(data);
      var requestUrl = _this.getRequestUrl(path, params);
      return Http.post(requestUrl, data);
    };

    /**
     * Delete Graph Request
     * @param {string} path
     * @param {object} params
     * @return {promise}
     */
    _this.delete = function(path, params) {
      var requestUrl = _this.getRequestUrl(path, params);
      return Http.delete(requestUrl);
    };

    /**
     * URL, version and enpoint
     * @param {string} path
     * @param {object} params
     * @return {string}
     */
    _this.getRequestUrl = function(path, params) {
      params = params || {};
      params.access_token =  api.getToken();
      params.locale =  api.getLocale();
      return url + 'v' + api.getVersion() + '/' + path + '?' + encodeParams(params);
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
        if (typeof params[param] == 'object')
          params[param] = !params[param] ? '' : JSON.stringify(params[param]);
        return param + '=' + encodeURIComponent(params[param]);
      }).join('&');
    }

    return _this;
  }

  return Graph;
}));
