(function(root, factory) {
  'use strict';
  var dependencies = [
    './fb-error'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else root.FacebookAdsApi.define('Http.XmlHttpRequest', dependencies, factory);
}(this, function(FbError) {
  'use strict';

  /**
   * Promise-based XmlHttpRequest
   * @type {object}
   * @see {@link} http://www.html5rocks.com/en/tutorials/es6/promises by Jake Archibald
   */
  function XmlHttpRequest() {
    var _this = {};

    /**
     * XmlHttpRequest request
     * @param {string} url
     * @param {string} method
     * @param {object} [data]
     * @return {promise}
     */
    function request(url, method, data) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            try {
              var response = JSON.parse(req.response);
              reject(new FbError(response.error, req));
            } catch (e) {
              reject(Error(req.statusText));
            }
          }
        };
        req.onerror = function() {
          reject(Error('Network Error'));
        };
        if (!FormData || !(data instanceof FormData))
          req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(data);
      });
    }

    /**
     * Get request
     * @param {string} url
     * @return {promise}
     */
    _this.get = function(url) {
      return request(url, 'GET').then(JSON.parse);
    };

    /**
     * Post request
     * @param {string}  url
     * @param {object}  data
     * @return {promise}
     */
    _this.post = function(url, data) {
      return request(url, 'POST', data).then(JSON.parse);
    };

    /**
     * Delete request
     * @param {string} url
     * @return {promise}
     */
    _this.delete = function(url) {
      return request(url, 'DELETE').then(JSON.parse);
    };

    return _this;
  }

  return new XmlHttpRequest();
}));
