(function(root) {
  'use strict';

  /**
   * Facebook Ads API
   * @param {string} token
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token) {
    var _this = {};

    if (!token)
      throw new Error('Be a darling and get us a nice token, will you?');

    // Http
    _this.http = new FacebookAdsApi.http.XmlHttpRequest();

    // Facebook Objects constructors
    var objects = ['AdAccount'];
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i];
      _this[object] = function() {
        return new FacebookAdsApi.objects[object](_this, arguments);
      };
    }

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

  // Modules
  if (typeof module !== 'undefined') {
    var path = require('path');
    module.exports = FacebookAdsApi;

    // Http
    module.exports.http = {
      XmlHttpRequest: require(path.join(__dirname, '../src/http/xml-http-request.js'))
    };

    // Facebook Objects
    module.exports.objects = {
      DataObject: require(path.join(__dirname, '../src/objects/data-object.js')),
      CrudObject: require(path.join(__dirname, '../src/objects/crud-object.js')),
      AdAccount: require(path.join(__dirname, '../src/objects/ad-account.js'))
    };
  } else {
    FacebookAdsApi.http = FacebookAdsApi.objects = {};
    root.FacebookAdsApi = FacebookAdsApi;
  }
})(this);
