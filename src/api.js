/**
 * Facebook Ads Api
 * @param {string} token
 * @class
 */
function FacebookAdsApi(token) {
  if (!token) 
    throw new Error('Be a darling and get us a nice token, will you?');

  this.http = FacebookAdsApi.XMLHttRequest;

  /**
   * Set API Token
   * @param {string} token
   */
  this.setToken = function(token) {
    token = token;
  }

  /**
   * Get API Token
   * @returns {string} token
   */
  this.getToken = function() {
    return token;
  }
  
  return this;
}