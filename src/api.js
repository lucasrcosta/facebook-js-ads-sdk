(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['http', 'graph', 'ad-account'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./http/graph.js')
    );
  } else {
    root.FacebookAdsApi = factory(root.FbApiAssets.http.Graph);
  }
}(this, function(Graph) {
  'use strict';

  /**
   * Facebook Ads API
   * @param {string} token
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token) {
    var _this = {};
    var version = '2.2';

    if (!token)
      throw new Error('Be a darling and get us a nice token, will you?');

    _this.graph = new Graph(_this);

    // Facebook Objects constructors
    // var objects = ['AdAccount'];
    // for (var i = 0; i < objects.length; i++) {
    //   var object = objects[i];
    //   _this[object] = function() {
    //     var params = [_this].concat(Array.prototype.slice.call(arguments));
    //     return FacebookAdsApi.objects[object].apply({}, params);
    //   };
    // }

    /**
     * Get API Version
     * @returns {string} version
     */
    _this.getVersion = function() {
      return version;
    };

    /**
     * Set API Token
     * @param {string} newToken
     */
    function setToken(newToken) {
      token = newToken;
      return _this;
    }
    _this.setToken = setToken;

    /**
     * Get API Token
     * @returns {string} token
     */
    _this.getToken = function() {
      return token;
    };

    return _this;
  }

  return FacebookAdsApi;
}));
