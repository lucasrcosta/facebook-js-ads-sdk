(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['./fb-error', '../utils/utils'], factory);
  } else {
    root.FbApiAssets.Http.XmlHttpRequest = factory(
      root.FbApiAssets.Http.FbError,
      root.FbApiAssets.Utils.Utils
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
     * XmlHttpRequest request
     * @param {string} url
     * @param {string} method
     * @param {object} [data]
     * @return {promise}
     */
    function request(url, method, data) {
      return new Promise(function(resolve, reject) {

        var req = new XMLHttpRequest();
        switch (method) {
          case 'POST':
            req.open('POST', url);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            data = Utils.encodeParams(data);
            break;
          case 'GET':
          case 'PUT':
          case 'DELETE':
            req.open(method, url);
            break;
        }

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
        req.send(data);
      });
    }

    /**
     * Get request
     * @param {string} url
     * @return {promise}
     */
    _this.get = function(url) {
      return request(url, 'GET');
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
      return request(url, 'POST', data);
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

    /**
     * Delete request
     * @param {string} url
     * @return {promise}
     */
    _this.delete = function(url) {
      return request(url, 'DELETE');
    };

    /**
     * Delete request with JSON response
     * @param {string} url
     * @return {promise}
     */
    _this.deleteJSON = function(url) {
      return _this.delete(url).then(JSON.parse);
    };

    return _this;
  }

  return new XmlHttpRequest();
}));
