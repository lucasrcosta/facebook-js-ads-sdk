(function(root) {
  'use strict';

  /**
   * Facebook Ads Api
   * @param {string} initToken
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(initToken) {
    var _this = {};
    var token;

    if (!initToken)
      throw new Error('Be a darling and get us a nice token, will you?');
    else setToken(initToken);

    _this.http = new FacebookAdsApi.XMLHttRequest();

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
    module.exports.XMLHttRequest = require(path.join(__dirname, '../src/utils/xml-http-request.js'));
    module.exports.DataObject = require(path.join(__dirname, '../src/objects/data-object.js'));
    module.exports.CrudObject = require(path.join(__dirname, '../src/objects/crud-object.js'));
  } else {
    root.FacebookAdsApi = FacebookAdsApi;
  }
})(this);
