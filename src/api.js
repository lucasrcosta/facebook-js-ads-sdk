(function(root, factory) {
  'use strict';
  var dependencies = [
    './http/graph',
    './objects/objects'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('FacebookAdsApi', dependencies, factory);
}(this, function(Graph, Objects) {
  'use strict';

  /**
   * Facebook Ads API
   * @param {string} token
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token, locale) {
    var _this = {};
    var version = '2.3';
    locale =  locale || 'en_US';

    if (!token)
      throw new Error('Be a darling and get us a nice token, will you?');

    _this.graph = new Graph(_this);

    // Facebook Objects constructors
    var objKeys = Object.keys(Objects);
    objKeys.forEach(function(object) {
      _this[object] = function() {
        var params = [_this].concat(Array.prototype.slice.call(arguments));
        return Objects[object].apply({}, params);
      };
      if (!Objects[object].getEndpoint)
        throw new Error(object + ' should implement getEndpoint');
      _this[object].getEndpoint =  Objects[object].getEndpoint;
      if (!Objects[object].getFields)
        throw new Error(object + ' should implement getFields');
      _this[object].getFields =  Objects[object].getFields;

      _this[object].getClassname = function() { return Objects[object].name; };
    });

    /**
     * Get API Version
     * @returns {string}
     */
    _this.getVersion = function() {
      return version;
    };

    /**
     * Get locale
     * @returns {string}
     */
    _this.getLocale = function() {
      return locale;
    };

    /**
     * Set API Token
     * @param {string}
     */
    function setToken(newToken) {
      token = newToken;
      return _this;
    }
    _this.setToken = setToken;

    /**
     * Get API Token
     * @returns {string}
     */
    _this.getToken = function() {
      return token;
    };

    /**
     * Read multiple Ids
     * @param   {CrudObject}  ObjClass
     * @param   {array}       ids
     * @param   {array}       filter     fields filter
     * @param   {object}      params
     * @return  {promise}
     * @resolve {Collection}
     */
    _this.readIds = function(ObjClass, ids, filter, params) {
      var fields = ObjClass.getFields();
      if (filter)
        checkFilter(filter, fields);
      else
        filter = fields;
      params = params || {};
      params.fields = filter;
      params.ids = ids.join();
      return new Promise(function(resolve, reject) {
        api.graph.get('/', params)
          .then(function(data) {
            var objects = [];
            Object.keys(data).map(function(id) {
              objects.push(new ObjClass(data[id]));
            });
            resolve(objects);
          })
        .catch(reject);
      });
    };

    return _this;
  }

  return FacebookAdsApi;
}));
