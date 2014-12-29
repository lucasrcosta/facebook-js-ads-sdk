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
    var http = new FacebookAdsApi.http.XmlHttpRequest();

    /**
     * URL, version and enpoint
     * @param  {string} endpoint
     * @return {string}
     */
    _this.getRequestUrl = function(endpoint) {
      return url + 'v' + api.getVersion() + '/' + endpoint;
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
