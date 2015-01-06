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
    var http = new FacebookAdsApi.http.Http();

    /**
     * Get Graph Request
     * @param  {string} path
     * @return {Promise}
     */
    _this.get = function(path) {
      var requestUrl = _this.getRequestUrl(path);
      requestUrl += '?access_token=' + api.getToken();
      return http.get(requestUrl);
    };

    /**
     * URL, version and enpoint
     * @param  {string} path
     * @return {string}
     */
    _this.getRequestUrl = function(path) {
      return url + 'v' + api.getVersion() + '/' + path;
    };

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
