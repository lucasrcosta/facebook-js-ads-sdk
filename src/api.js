(function(root) {
  "use strict";

  /**
   * Facebook Ads Api
   * @param {string} token
   * @class
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token) {
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
    }
    this.setToken = setToken;

    /**
     * Get API Token
     * @returns {string} token
     */
    function getToken() {
      return token;
    }
    this.getToken = getToken;

    return this;
  }

  /**
   * Make sure that a submodule was called with the "new" operator
   * @param  {Object} object
   * @throws {Error} if "new" was ommited
   */
  FacebookAdsApi.checkThis = function(object) {
    if(object==FacebookAdsApi)
      throw Error('Initialize object with "new" operator');
  }

  // Module
  if (typeof module !== 'undefined') module.exports = FacebookAdsApi;
  else root.FacebookAdsApi = FacebookAdsApi;
})(this);