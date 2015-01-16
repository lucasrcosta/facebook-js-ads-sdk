(function(root, factory) {
  'use strict';
  var dependencies = [
    './xml-http-request',
    './../utils/utils'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') {
    dependencies[0] = './http';
    module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  }
  else root.FbApiAssets.define('Http.Graph', dependencies, factory);
}(this, function(Http, Utils) {
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
      return Http.getJSON(requestUrl);
    };

    /**
     * Post Graph Request
     * @param {string} path
     * @param {object} params
     * @param {object} data
     * @return {promise}
     */
    _this.post = function(path, params, data) {
      var requestUrl = _this.getRequestUrl(path, params);
      return Http.postJSON(requestUrl, data);
    };

    /**
     * Delete Graph Request
     * @param {string} path
     * @return {promise}
     */
    _this.delete = function(path) {
      var requestUrl = _this.getRequestUrl(path);
      return Http.deleteJSON(requestUrl);
    };

    /**
     * URL, version and enpoint
     * @param {string} path
     * @param {object} params
     * @return {string}
     */
    _this.getRequestUrl = function(path, params) {
      params = addTokenAndLocale(params);
      return url + 'v' + api.getVersion() + '/' + path + '?' + Utils.encodeParams(params);
    };

    /**
     * Facebook Graph Url
     * @return {string}
     */
    _this.getGraphUrl = function() {
      return url;
    };

    /**
     * @param {object} obj
     * @augments obj
     */
    function addTokenAndLocale(obj) {
      obj = obj || {};
      obj.access_token =  api.getToken();
      obj.locale =  api.getLocale();
      return obj;
    }

    return _this;
  }

  return Graph;
}));
