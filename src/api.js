(function(root) {
  'use strict';

  /**
   * Facebook Ads Api
   * @param {string} token
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token) {
    var _this = {};

    if (!token)
      throw new Error('Be a darling and get us a nice token, will you?');

    _this.http = new FacebookAdsApi.XmlHttpRequest();
    _this.AdAccount = function() {
      return new FacebookAdsApi.AdAccount(_this, arguments);
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

  // Module
  if (typeof module !== 'undefined') {
    var path = require('path');
    module.exports = FacebookAdsApi;
    module.exports.XmlHttpRequest = require(path.join(__dirname, '../src/utils/xml-http-request.js'));

    // Objects
    module.exports.DataObject = require(path.join(__dirname, '../src/objects/data-object.js'));
    module.exports.CrudObject = require(path.join(__dirname, '../src/objects/crud-object.js'));
    module.exports.AdAccount = require(path.join(__dirname, '../src/objects/ad-account.js'));
  } else {
    root.FacebookAdsApi = FacebookAdsApi;
  }
})(this);
