(function(root, factory) {
  'use strict';
  var dependencies = [
    './../../http/xml-http-request',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') {
    dependencies[0] = './../../http/http';
    module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  }
  else root.FacebookAdsApi.define('Objects.Core.Collection', dependencies, factory);
}(this, function(Http) {
  'use strict';

  function Collection(ObjClass, response) {
    var _this = dataToObjects(ObjClass, response.data);
    var paging = response.paging;

    /**
     * Fetch next page and update collection
     * @return {_this}
     */
    _this.nextPage = function() {
      return new Promise(function(resolve, reject) {
        if (!paging.next) {
          resolve(false);
          return;
        }
        Http.getJSON(paging.next)
          .then(function(response) {
            setCollection(response.data);
            paging = response.paging;
            resolve(_this);
          })
          .catch(reject);
      });
    };

    /**
     * Has next pagination
     * @return {bool}
     */
    _this.hasNext = function() {
      return !!paging.next;
    };

    /**
     * Fetch previous page and update collection
     * @return {_this}
     */
    _this.previousPage = function() {
      return new Promise(function(resolve, reject) {
        if (!paging.previous) {
          resolve(false);
          return;
        }
        Http.getJSON(paging.previous)
          .then(function(response) {
            setCollection(response.data);
            paging = response.paging;
            resolve(_this);
          })
          .catch(reject);
      });
    };

    /**
     * Has previous pagination
     * @return {bool}
     */
    _this.hasPrevious = function() {
      return !!paging.previous;
    };

    /**
     * After cursor
     * @return {string|false}
     */
    _this.getAfter = function() {
      return (paging.cursor && paging.cursor.after) ? paging.cursor.after : false;
    };

    /**
     * Before cursor
     * @return {string|false}
     */
    _this.getBefore = function() {
      return (paging.cursor && paging.cursor.before) ? paging.cursor.after : false;
    };

    /**
     * Turn response data into objects
     * @param  {class} ObjClass
     * @param  {array} data
     * @return {array}
     */
    function dataToObjects(ObjClass, data) {
      var objArray = [];
      for (var i = 0; i < data.length; i++) {
        objArray.push(new ObjClass(data[i]));
      }
      return objArray;
    }

    /**
     * Set new collection data
     * @param {array} data
     */
    function setCollection(data) {
      _this.length = 0;
      _this.push.apply(_this, dataToObjects(ObjClass, data));
    }

    return _this;
  }

  return Collection;
}));
