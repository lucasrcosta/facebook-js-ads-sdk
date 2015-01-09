(function() {
  'use strict';

  var Promise = require('promise');
  var FbError = require('./fb-error.js');
  var request = require('request-json');
  var client = request.newClient('http://localhost:8888/');

  /**
   * Promise-based Http wrapper
   * @type {object}
   */
  function Http() {
    var _this = {};

    /**
     * Get request
     * @param {string} url
     * @return {promise}
     */
    _this.get = function(url) {
      return new Promise(function(resolve, reject) {
        client.get(url, function(err, res, body) {
          if (err) reject(err);
          else {
            if (body.error)
              reject(new FbError(body.error));
            else
              resolve(body);
          }
        });
      });
    };

    /**
     * Get JSON request alias
     * @param {string} url
     * @return {promise}
     */
    _this.getJSON = function(url) {
      return _this.get(url);
    };

    /**
     * Post request
     * @param {string} url
     * @param {object} data
     * @return {promise}
     */
    _this.post = function(url, data) {
      return new Promise(function(resolve, reject) {
        client.post(url, data, function(err, res, body) {
          if (err) reject(err);
          else {
            if (body.error)
              reject(new FbError(body.error));
            else
              resolve(body);
          }
        });
      });
    };

    return _this;
  }

  module.exports = Http;
})();
