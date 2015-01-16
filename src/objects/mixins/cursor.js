if (typeof exports === 'object')
    var Promise = require('promise');

(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([
      './../../http/xml-http-request',
    ], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./../../http/http')
    );
  } else {
    root.FbApiAssets.Utils.Cursor = factory(
      root.FbApiAssets.Http.XmlHttpRequest
    );
  }
}(this, function(Http) {
  'use strict';

  /**
   * Array mixin
   * @param {[type]} paging [description]
   */
  function Cursor(ObjClass, paging) {
    var _this = this;

    this.nextPage = function() {
      return new Promise(function(resolve, reject) {
        if (!paging.next) {
          resolve(false);
          return;
        }
        Http.getJSON(paging.next)
          .then(function(response) {
            paging = response.paging;
            _this.setCollection(response.data);
            resolve(_this);
          })
          .catch(reject);
      });
    };

    this.hasNext = function() {
      return !!paging.next;
    };

    this.previousPage = function() {
      return new Promise(function(resolve, reject) {
        if (!paging.previous) {
          resolve(false);
          return;
        }
        Http.getJSON(paging.previous)
          .then(function(response) {
            paging = response.paging;
            _this.setCollection(response.data);
            resolve(_this);
          })
          .catch(reject);
      });
    };

    this.hasPrevious = function() {
      return !!paging.previous;
    };

  }

  return Cursor;
}));
