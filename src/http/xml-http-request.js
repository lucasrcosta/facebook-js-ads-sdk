(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['fb-error'], factory);
  } else {
    root.FbApiAssets.http.Http = factory(root.FbApiAssets.http.FbError);
  }
}(this, function(FbError) {
  'use strict';

  /**
   * Promise-based XmlHttpRequest
   * @type {object}
   * @see {@link} http://www.html5rocks.com/en/tutorials/es6/promises/ by Jake Archibald
   */
  function XmlHttpRequest() {
    var _this = {};

    /**
     * Get request
     * @param {string} url
     * @return {promise}
     */
    _this.get = function(url) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
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
        req.send();
      });
    };

    /**
     * Get JSON Request
     * @param {string} url
     * @return {promise}
     */
    _this.getJSON = function(url) {
      return _this.get(url).then(JSON.parse);
    };

    /**
     * Post request
     * @param {string} url
     * @param {object} data
     * @return {promise}
     */
    _this.post = function(url, data) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url);
        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            try {
              var response = JSON.parse(req.response);
              var error = response.error ? response.error : response;
              reject(new FbError(error, req));
            } catch (e) {
              reject(Error(req.statusText));
            }
          }
        };
        req.onerror = function() {
          reject(Error('Network Error'));
        };
        req.send(encodeParams(data));
      });
    };

    return _this;
  }

  return XmlHttpRequest;
}));
