(function(root) {
  'use strict';

  /**
   * Facebook Graph requests
   * @type {Object}
   */
  function Graph() {
    var _this = {};
    var http = new FacebookAdsApi.http.XmlHttpRequest();

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
