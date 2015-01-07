(function(root) {
  'use strict';

  /**
   * Facebook Graph requests
   * @param {FacebookAdsApi} api
   * @type {Object}
   */
  function Graph(api) {
    var _this = {};
    var url = 'https://graph.facebook.com/';
    _this.http = new FacebookAdsApi.http.Http();

    /**
     * Get Graph Request
     * @param  {string} path
     * @param  {Object} params
     * @return {Promise}
     */
    _this.get = function(path, params) {
      var requestUrl = _this.getRequestUrl(path);
      params = params || {};
      params.access_token =  api.getToken();
      requestUrl += '?' + encodeParams(params);
      return _this.http.getJSON(requestUrl);
    };

    /**
     * URL, version and enpoint
     * @param  {string} path
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
     * @param  {Object} params
     * @return {string} querystring
     */
    function encodeParams(params) {
      return Object.keys(params).map(function(param) {
        return param + '=' + params[param];
      }).join('&');
    }

    return _this;
  }

  // Module
  var FacebookAdsApi;
  if (typeof module !== 'undefined') {
    FacebookAdsApi = module.parent.exports;
    module.exports = Graph;
  } else {
    root.FacebookAdsApi.http.Graph = Graph;
    FacebookAdsApi = root.FacebookAdsApi;
  }
})(this);
