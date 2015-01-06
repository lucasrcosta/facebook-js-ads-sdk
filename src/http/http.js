(function() {
  'use strict';

  var Promise = require('promise');

  /**
   * Promise-based Http wrapper
   * @type {Object}
   */
  function Http() {
    var _this = {};

    /**
     * Get Request
     * @return {Promise}
     */
    _this.get = function() {
      return new Promise(function(resolve) {
        resolve(42);
      });
    };

    /**
     * Get JSON Request
     * @author Jake Archibald
     * @param  {string} url
     * @return {Promise}
     */
    _this.getJSON = function(url) {
      return _this.get(url).then(JSON.parse);
    };

    return _this;
  }

  // Module
  module.exports = Http;
})(this);
