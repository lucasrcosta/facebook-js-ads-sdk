(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['./xml-http-request', './../utils/utils'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./http'),
      require('./../utils/utils')
    );
  } else {
    root.FbApiAssets.Http.Graph = factory(
      root.FbApiAssets.Http.XmlHttpRequest,
      root.FbApiAssets.Utils
    );
  }
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
    _this.http = new Http();

    /**
     * Get Graph Request
     * @param {string} path
     * @param {object} params
     * @return {promise}
     */
    _this.get = function(path, params) {
      var requestUrl = _this.getRequestUrl(path, params);
      return _this.http.getJSON(requestUrl);
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
      return _this.http.postJSON(requestUrl, data);
    };

    /**
     * Delete Graph Request
     * @param {string} path
     * @return {promise}
     */
    _this.delete = function(path) {
      var requestUrl = _this.getRequestUrl(path);
      return _this.http.deleteJSON(requestUrl);
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
