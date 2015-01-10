(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['fb-error', 'utils'], factory);
  } else {
    root.FbApiAssets.http.Http = factory(
      root.FbApiAssets.http.FbError,
      root.FbApiAssets.Utils
    );
  }
}(this, function(FbError, Utils) {
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
     * Get request with JSON response
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
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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
        req.send(Utils.encodeParams(data));
      });
    };

    /**
     * Post request with JSON response
     * @param {string} url
     * @param {object} data
     * @return {promise}
     */
    _this.postJSON = function(url, data) {
      return _this.post(url, data).then(JSON.parse);
    };

    return _this;
  }

  return XmlHttpRequest;
}));
