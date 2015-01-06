(function() {
  'use strict';

  var Promise = require('promise');
  var request = require('request-json');
  var client = request.newClient('http://localhost:8888/');

  /**
   * Promise-based Http wrapper
   * @type {Object}
   */
  function Http() {
    var _this = {};

    /**
     * Get request
     * @param {string} url
     * @return {Promise}
     */
    _this.get = function(url) {
      return new Promise(function(resolve, reject) {
        client.get(url, function(err, res, body) {
          if (err) reject(err);
          else resolve(body);
        });
      });
    };

    /**
     * Get JSON request alias
     * @param {string} url
     * @return {Promise}
     */
    _this.getJSON = function(url) {
      return _this.get(url);
    };

    return _this;
  }

  // Module
  module.exports = Http;
})(this);
