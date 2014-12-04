(function(root) {
  "use strict";

  /**
   * Promise based XMLHttRequest
   * @type {Object}
   * @see {@link http://www.html5rocks.com/en/tutorials/es6/promises/}
   */
  function XMLHttRequest() {
    /**
     * Get Request
     * @author Jake Archibald
     * @param  {string} url
     * @return {Promise}
     */
    function get(url) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            reject(Error(req.statusText));
          }
        };
        req.onerror = function() {
          reject(Error("Network Error"));
        };
        req.send();
      });
    }
    this.get = get;

    /**
     * Get JSON Request
     * @author Jake Archibald
     * @param  {string} url
     * @return {Promise}
     */
    function getJSON(url) {
      return this.get(url).then(JSON.parse);
    }
    this.getJSON = getJSON;

    return this;
  };

  // Module
  if (typeof module !== 'undefined') module.exports = XMLHttRequest;
  else root.FacebookAdsApi.XMLHttRequest = XMLHttRequest;
})(this);