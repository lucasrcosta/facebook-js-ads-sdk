(function(root) {
  'use strict';

  /**
   * Facebook Ads Api
   * @param {string} token
   * @class
   * @throws {TypeError} if "new" operator was ommited during instanciation
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token) {
    if (!this)
      throw new TypeError('Instantiate object with "new" operator');
    if (!token)
      throw new Error('Be a darling and get us a nice token, will you?');
    else setToken(token);

    this.http = FacebookAdsApi.XMLHttRequest;

    /**
     * Set API Token
     * @param {string} token
     */
    function setToken(token) {
      token = token;
      return this;
    }
    this.setToken = setToken;

    /**
     * Get API Token
     * @returns {string} token
     */
    this.getToken = function() {
      return token;
    };

    return this;
  }

  /**
   * Make sure that a submodule was called with the "new" operator
   * @param  {Object} object
   * @throws {TypeError} object (caller's this) is not FacebookAdsApi
   */
  FacebookAdsApi.checkThis = function(object) {
    if (object == FacebookAdsApi)
      throw new TypeError('Instantiate object with "new" operator');
  };

  // Module
  if (typeof module !== 'undefined') module.exports = FacebookAdsApi;
  else root.FacebookAdsApi = FacebookAdsApi;
})(this);
