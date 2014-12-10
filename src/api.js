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

    _this.http = FacebookAdsApi.XMLHttRequest;

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
  if (typeof module !== 'undefined') module.exports = FacebookAdsApi;
  else root.FacebookAdsApi = FacebookAdsApi;
})(this);
