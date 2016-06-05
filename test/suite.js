define(['exports', 'chai'], function (exports, chai) { 'use strict';

  var chai__default = 'default' in chai ? chai['default'] : chai;

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  /**
   * Isomorphic Http Promise Requests Class
   */

  var Http = function () {
    function Http() {
      babelHelpers.classCallCheck(this, Http);
    }

    babelHelpers.createClass(Http, null, [{
      key: 'request',


      /**
       * Request
       * @param {string} method
       * @param {string} url
       * @param {object} [data]
       * @return {Promise}
       */
      value: function request(method, url, data) {
        if (typeof window !== 'undefined' && window.XMLHttpRequest) {
          return Http.xmlHttpRequest(method, url, data);
        }
        return Http.request_promise(method, url, data);
      }

      /**
       * XmlHttpRequest request
       * @param {string} method
       * @param {string} url
       * @param {object} [data]
       * @return {Promise}
       */

    }, {
      key: 'xmlHttpRequest',
      value: function xmlHttpRequest(method, url, data) {
        return new Promise(function (resolve, reject) {
          var request = new window.XMLHttpRequest();
          request.open(method, url);
          request.onload = function () {
            try {
              var response = JSON.parse(request.response);

              if (request.status === 200) {
                resolve(response);
              } else {
                reject({
                  body: response,
                  status: request.status
                });
              }
            } catch (e) {
              reject({
                body: request.responseText,
                status: request.status
              });
            }
          };
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          request.setRequestHeader('Content-Type', 'application/json');
          request.setRequestHeader('Accept', 'application/json');
          request.send(JSON.stringify(data));
        });
      }

      /**
       * Request Promise
       * @param {string} method
       * @param {string} url
       * @param {object} [data]
       * @return {Promise}
       */

    }, {
      key: 'request_promise',
      value: function request_promise(method, url, data) {
        var rp = require('request-promise');
        var options = {
          method: method,
          uri: url,
          json: true,
          headers: { 'User-Agent': 'Facebook-JS-Ads-SDK/' + FacebookAdsApi.VERSION }
        };
        if (data) {
          options.body = data;
        }
        return rp(options).catch(function (response) {
          response = {
            body: response.error ? response.error : response,
            status: response.statusCode
          };
          throw response;
        });
      }
    }]);
    return Http;
  }();

  function FacebookError(error) {
    this.name = 'FacebookError';
    this.message = error.message;
    this.stack = new Error().stack;
  }
  FacebookError.prototype = Object.create(Error.prototype);
  FacebookError.prototype.constructor = FacebookError;

  var FacebookRequestError = function (_FacebookError) {
    babelHelpers.inherits(FacebookRequestError, _FacebookError);

    function FacebookRequestError(response, method, url, data) {
      babelHelpers.classCallCheck(this, FacebookRequestError);

      var error = response.body.error;
      var message = error.error_user_msg ? error.error_user_title + ': ' + error.error_user_msg : error.message;

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(FacebookRequestError).call(this, message));

      _this.name = 'FacebookRequestError';
      _this.message = message;
      _this.status = response.status;
      _this.response = response.body;
      _this.method = method;
      _this.url = url;
      if (data) _this.data = data;
      return _this;
    }

    return FacebookRequestError;
  }(FacebookError);

  /**
   * Facebook Ads API
   */

  var FacebookAdsApi = function () {
    babelHelpers.createClass(FacebookAdsApi, null, [{
      key: 'VERSION',
      get: function get() {
        return 'v2.6';
      }
    }, {
      key: 'GRAPH',
      get: function get() {
        return 'https://graph.facebook.com';
      }

      /**
       * @param {string} accessToken
       * @param {string} locale
       */

    }]);

    function FacebookAdsApi(accessToken) {
      var locale = arguments.length <= 1 || arguments[1] === undefined ? 'en_US' : arguments[1];
      babelHelpers.classCallCheck(this, FacebookAdsApi);

      if (!accessToken) {
        throw new Error('Access token required');
      }
      this.accessToken = accessToken;
      this.locale = locale;
      this._debug = false;
    }

    /**
     * Instantiate an API and store it as the default
     * @param  {string} accessToken
     * @param  {string} locale
     * @return {FacebookAdsApi}
     */


    babelHelpers.createClass(FacebookAdsApi, [{
      key: 'setDebug',
      value: function setDebug(flag) {
        this._debug = flag;
        return this;
      }
    }, {
      key: 'call',
      value: function call(method, path) {
        var _this = this;

        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var url;
        if (method === 'POST' || method === 'PUT') {
          var data = params;
          params = {};
        }
        if (typeof path !== 'string' && !(path instanceof String)) {
          url = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION].concat(babelHelpers.toConsumableArray(path)).join('/');
          params['access_token'] = this.accessToken;
          url += '?' + FacebookAdsApi._encode_params(params);
        } else {
          url = path;
        }

        return Http.request(method, url, data).then(function (response) {
          if (_this._debug) console.log('200 ' + method + ' ' + url + ' ' + (data ? JSON.stringify(data) : ''));
          return Promise.resolve(response);
        }).catch(function (response) {
          if (_this._debug) {
            console.log(response.status + ' ' + method + ' ' + url + ' ' + (data ? JSON.stringify(data) : ''));
          }
          throw new FacebookRequestError(response, method, url, data);
        });
      }
    }], [{
      key: 'init',
      value: function init(accessToken, locale) {
        var api = new this(accessToken, locale);
        this.setDefaultApi(api);
        return api;
      }
    }, {
      key: 'setDefaultApi',
      value: function setDefaultApi(api) {
        this._defaultApi = api;
      }
    }, {
      key: 'getDefaultApi',
      value: function getDefaultApi() {
        return this._defaultApi;
      }
    }, {
      key: '_encode_params',
      value: function _encode_params(params) {
        return Object.keys(params).map(function (k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        }).join('&');
      }
    }]);
    return FacebookAdsApi;
  }();

  chai.should();

  describe('FacebookAdsApi', function () {
    it('should hold a a default instance', function () {
      var api = FacebookAdsApi.init('token');
      FacebookAdsApi.getDefaultApi().should.be.equal(api);
    });
  });

  /**
   * Abstract Object (may or may not have explicitly be a node of the Graph)
   * Manages object data fields and provides matching properties
   */
  var AbstractObject = function () {
    function AbstractObject() {
      var _this = this;

      babelHelpers.classCallCheck(this, AbstractObject);

      this._data = {};
      if (this.constructor.Fields === undefined) {
        throw new Error('A "Fields" frozen object must be defined in the object class');
      }
      this._fields = Object.keys(this.constructor.Fields);
      this._fields.forEach(function (field) {
        _this._defineProperty(field);
      });
    }

    /**
     * Define data getter and setter field
     */


    babelHelpers.createClass(AbstractObject, [{
      key: '_defineProperty',
      value: function _defineProperty(field) {
        var _this2 = this;

        Object.defineProperty(this, field, {
          get: function get() {
            return _this2._data[field];
          },
          set: function set(value) {
            _this2._data[field] = value;
          },
          enumerable: true
        });
      }

      /**
       * Set data field
       * @param {string} field
       * @param {mixed} value
       * @return this
       */

    }, {
      key: 'set',
      value: function set(field, value) {
        if (this._fields.indexOf(field) < 0) {
          this._defineProperty(field);
        }
        this[field] = value;
        return this;
      }

      /**
       * Set multiple data fields
       * @param {object} data
       * @return this
       */

    }, {
      key: 'setData',
      value: function setData(data) {
        var _this3 = this;

        Object.keys(data).forEach(function (key) {
          _this3.set(key, data[key]);
        });
        return this;
      }

      /**
       * Export object data
       * @return {object}
       */

    }, {
      key: 'exportData',
      value: function exportData() {
        return this._data;
      }
    }]);
    return AbstractObject;
  }();

  /**
   * Abstract Crud Object
   * Facebook Object basic persistence functions
   * @extends AbstractObject
   */
  var AbstractCrudObject = function (_AbstractObject) {
    babelHelpers.inherits(AbstractCrudObject, _AbstractObject);


    /**
     * @param  {array} fields
     * @param  {object} data Initial data
     * @param  {string} parentId
     * @param  {FacebookAdApi} api
     */

    function AbstractCrudObject(data, parentId, api) {
      babelHelpers.classCallCheck(this, AbstractCrudObject);

      var _this4 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AbstractCrudObject).call(this, data));

      _this4._parentId = parentId;
      _this4._api = api || FacebookAdsApi.getDefaultApi();
      if (data) {
        babelHelpers.get(Object.getPrototypeOf(AbstractCrudObject.prototype), 'setData', _this4).call(_this4, data);
      }
      return _this4;
    }

    /**
     * Define data getter and setter recording changes
     */


    babelHelpers.createClass(AbstractCrudObject, [{
      key: '_defineProperty',
      value: function _defineProperty(field) {
        var _this5 = this;

        if (this._changes === undefined) {
          this._changes = {};
        }
        Object.defineProperty(this, field, {
          get: function get() {
            return _this5._data[field];
          },
          set: function set(value) {
            _this5._changes[field] = value;
            _this5._data[field] = value;
          },
          enumerable: true
        });
      }

      /**
       * Set object data as if it were read from the server. Wipes related changes
       * @param {object} data
       * @return this
       */

    }, {
      key: 'setData',
      value: function setData(data) {
        var _this6 = this;

        babelHelpers.get(Object.getPrototypeOf(AbstractCrudObject.prototype), 'setData', this).call(this, data);
        Object.keys(data).forEach(function (key) {
          delete _this6._changes[key];
        });
        return this;
      }

      /**
       * Export changed object data
       * @return {object}
       */

    }, {
      key: 'exportData',
      value: function exportData() {
        return this._changes;
      }

      /**
       * Clear change history
       * @return this
       */

    }, {
      key: 'clearHistory',
      value: function clearHistory() {
        this._changes = {};
        return this;
      }

      /**
       * @throws {error} if object has no id
       * @return {string}
       */

    }, {
      key: 'getId',
      value: function getId() {
        if (!this.id) {
          throw new Error(this.constructor.name + ' Id not defined');
        }
        return this.id;
      }

      /**
       * @throws {error} if object has no parent id
       * @return {string}
       */

    }, {
      key: 'getParentId',
      value: function getParentId() {
        if (!this._parentId) {
          throw new Error(this.constructor.name + ' parentId not defined');
        }
        return this._parentId;
      }

      /**
       * @return {string}
       */

    }, {
      key: 'getNodePath',
      value: function getNodePath() {
        return this.getId();
      }

      /**
       * Return object API instance
       * @throws {Error} if object doesn't hold an API
       * @return {FacebookAdsApi}
       */

    }, {
      key: 'getApi',
      value: function getApi() {
        var api = this._api;
        if (!api) {
          throw new Error(this.constructor.name + ' does not yet have an associated api object.\n\n        Did you forget to instantiate an API session with: "FacebookAdsApi.init"?');
        }
        return api;
      }

      /**
       * Read object data
       * @param   {Array}   [fields]
       * @param   {Object}  [params]
       * @return  {Promise}
       */

    }, {
      key: 'read',
      value: function read(fields) {
        var _this7 = this;

        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var api = this.getApi();
        var path = [this.getNodePath()];
        if (fields) params['fields'] = fields.join(',');
        return new Promise(function (resolve, reject) {
          api.call('GET', path, params).then(function (data) {
            return resolve(_this7.setData(data));
          }).catch(reject);
        });
      }

      /**
       * Create object
       * @param   {Object}  [params]
       * @return  {Promise}
       */

    }, {
      key: 'create',
      value: function create() {
        var _this8 = this;

        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var api = this.getApi();
        var path = [this.getParentId(), this.constructor.getEndpoint()];
        params = Object.assign(params, this.exportData());
        return new Promise(function (resolve, reject) {
          api.call('POST', path, params).then(function (data) {
            return resolve(_this8.setData(data));
          }).catch(reject);
        });
      }

      /**
       * Update object
       * @param   {Object}  [params]
       * @return  {Promise}
       */

    }, {
      key: 'update',
      value: function update() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var api = this.getApi();
        var path = [this.getNodePath()];
        params = Object.assign(params, this.exportData());
        return new Promise(function (resolve, reject) {
          api.call('POST', path, params).then(function (data) {
            return resolve(data);
          }).catch(reject);
        });
      }

      /**
       * Delete object
       * @param   {Object}  [params]
       * @return  {Promise}
       */

    }, {
      key: 'delete',
      value: function _delete() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var api = this.getApi();
        var path = [this.getNodePath()];
        params = Object.assign(params, this.exportData());
        return new Promise(function (resolve, reject) {
          api.call('DELETE', path, params).then(function (data) {
            return resolve(data);
          }).catch(reject);
        });
      }

      /**
       * Create or Update object
       * @param   {Object}  [params]
       * @return  {Promise}
       */

    }, {
      key: 'save',
      value: function save(params) {
        if (this.id) return this.update(params);
        return this.create(params);
      }

      /**
       * Initialize Cursor to paginate on edges
       * @param  {Object}  targetClass
       * @param  {Array}   fields
       * @param  {Object}  params
       * @param  {Boolean} fetchFirstPage
       * @return {Cursor}
       */

    }, {
      key: 'getEdge',
      value: function getEdge(targetClass, fields) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var fetchFirstPage = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

        if (fields) params['fields'] = fields.join(',');
        var sourceObject = this;
        var cursor = new Cursor(sourceObject, targetClass, params);
        if (fetchFirstPage) {
          return cursor.next();
        }
        return cursor;
      }

      /**
       * Read Objects by Ids
       * @param  {array} ids
       * @param  {Array}  fields
       * @param  {Object} params
       * @param  {FacebookAdsApi} [api]
       * @return {Promise}
       */

    }], [{
      key: 'getByIds',
      value: function getByIds(ids, fields) {
        var _this9 = this;

        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var api = arguments[3];

        api = api || FacebookAdsApi.getDefaultApi();
        if (fields) params['fields'] = fields.join(',');
        params['ids'] = ids.join(',');
        return new Promise(function (resolve, reject) {
          return api.call('GET', [''], params).then(function (response) {
            var result = [];
            for (var id in response) {
              var data = response[id];
              var object = new _this9(data);
              result.push(object);
            }
            resolve(result);
          }).catch(reject);
        });
      }
    }]);
    return AbstractCrudObject;
  }(AbstractObject);

  /**
   * Cursor
   * Iterates over edge objects and controls pagination
   */
  var Cursor = function (_Array) {
    babelHelpers.inherits(Cursor, _Array);


    /**
     * @param  {Object} sourceObject
     * @param  {Object} targetClass
     * @param  {Object}  params
     */

    function Cursor(sourceObject, targetClass, params) {
      babelHelpers.classCallCheck(this, Cursor);

      var _this10 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Cursor).call(this, 0));

      var next = [sourceObject.getId(), targetClass.getEndpoint()];
      _this10._api = sourceObject.getApi();
      _this10._targetClass = targetClass;
      _this10.paging = { next: next };
      _this10.summary;

      _this10.clear = function () {
        _this10.length = 0;
      };

      _this10.set = function (array) {
        _this10.clear();
        _this10.push.apply(_this10, babelHelpers.toConsumableArray(array));
      };

      _this10.next = function () {
        if (!_this10.hasNext()) {
          return Promise.reject(new RangeError('end of pagination'));
        }
        return _this10._loadPage(_this10.paging.next);
      };

      _this10.hasNext = function () {
        return Boolean(_this10.paging) && Boolean(_this10.paging.next);
      };

      _this10.previous = function () {
        if (!_this10.hasPrevious()) {
          return Promise.reject(new RangeError('start of pagination'));
        }
        return _this10._loadPage(_this10.paging.previous);
      };

      _this10.hasPrevious = function () {
        return Boolean(_this10.paging) && Boolean(_this10.paging.previous);
      };

      _this10._loadPage = function (path) {
        var promise = new Promise(function (resolve, reject) {
          _this10._api.call('GET', path, params).then(function (response) {
            var objects = _this10._buildObjectsFromResponse(response);
            _this10.set(objects);
            _this10.paging = response.paging;
            _this10.summary = response.summary;
            resolve(_this10);
          }).catch(reject);
        });
        if (params) params = undefined;
        return promise;
      };

      _this10._buildObjectsFromResponse = function (response) {
        return response.data.map(function (item) {
          return new _this10._targetClass(item, undefined, _this10._api);
        });
      };
      return _this10;
    }

    return Cursor;
  }(Array);

  chai__default.should();

  describe('AbstractObject', function () {
    var ConcreteObject = function (_AbstractObject) {
      babelHelpers.inherits(ConcreteObject, _AbstractObject);

      function ConcreteObject() {
        babelHelpers.classCallCheck(this, ConcreteObject);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ConcreteObject).apply(this, arguments));
      }

      babelHelpers.createClass(ConcreteObject, null, [{
        key: 'Fields',
        get: function get() {
          return Object.freeze({ field: 'field' });
        }
      }]);
      return ConcreteObject;
    }(AbstractObject);

    it('should possess a Fields enum', function () {
      ;(function () {
        return new AbstractObject().should.throw(Error);
      });(function () {
        return (ConcreteObject.Fields = {}).should.throw(TypeError);
      });(function () {
        return (ConcreteObject.Fields.field = '').should.throw(TypeError);
      });
      ConcreteObject.Fields.field.should.be.equal('field');
    });

    it('should create a data object with getters and setters for fields', function () {
      var object = new ConcreteObject();
      var descriptor = Object.getOwnPropertyDescriptor(object, 'field');
      descriptor.get.should.be.a('function');
      descriptor.set.should.be.a('function');
      descriptor.enumerable.should.be.ok;
    });

    it('should set a data field value', function () {
      var object = new ConcreteObject();
      object.set('field', 1);
      object._data.field.should.be.equal(1);
    });

    it('should set an extra data field value', function () {
      var object = new ConcreteObject();
      object.set('field', 1);
      object._data.field.should.be.equal(1);
    });

    it('should chain the set method', function () {
      var object = new ConcreteObject();
      object.set('field', 1).should.be.equal(object);
    });

    it('should set multiple data fields', function () {
      var object = new ConcreteObject();
      object.setData({ field: 1, extrafield: 2 });
      object.field.should.be.equal(1);
      object.extrafield.should.be.equal(2);
    });

    it('should set data', function () {
      var data = { field: 1, extrafield: 2 };
      var object = new ConcreteObject().setData(data);
      object.exportData().should.be.eql(data);
    });

    it('should chain the setData method', function () {
      var object = new ConcreteObject();
      object.setData({ field: 1 }).should.be.equal(object);
    });

    it('should export data', function () {
      var data = { field: 1, extrafield: 2 };
      var object = new ConcreteObject();
      object.setData(data);
      object.exportData().should.be.eql(data);
    });
  });

  describe('AbstractCrudObject', function () {
    var ConcreteCrudObject = function (_AbstractCrudObject) {
      babelHelpers.inherits(ConcreteCrudObject, _AbstractCrudObject);

      function ConcreteCrudObject() {
        babelHelpers.classCallCheck(this, ConcreteCrudObject);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ConcreteCrudObject).apply(this, arguments));
      }

      babelHelpers.createClass(ConcreteCrudObject, null, [{
        key: 'Fields',
        get: function get() {
          return Object.freeze({ field: 'field' });
        }
      }]);
      return ConcreteCrudObject;
    }(AbstractCrudObject);

    it('should store changes for field properties', function () {
      var object = new ConcreteCrudObject({ 'field': 3 });
      object.set('extraField', 4);
      object._changes.should.be.eql({ field: 3, extraField: 4 });
    });

    it('should set data wiping change history', function () {
      var object = new ConcreteCrudObject();
      object.field = 3;
      object.setData({ 'field': 3 });
      object.exportData().should.be.eql({});
    });

    it('should export changed data', function () {
      var object = new ConcreteCrudObject();
      object.field = 3;
      object.exportData().should.be.eql({ 'field': 3 });
    });

    it('should clear change history', function () {
      var object = new ConcreteCrudObject();
      object.field = 3;
      object.clearHistory();
      object.exportData().should.be.eql({});
    });
  });

  describe('Cursor', function () {
    var callStub = function callStub(method, url) {
      return new Promise(function (resolve, reject) {
        if (url === '[nextUrl]') {
          resolve({
            data: [4, 5, 6],
            paging: {
              cursors: {
                before: '[beforeCursor]',
                after: '[afterCursor]'
              },
              previous: '[previousUrl]'
            },
            summary: { total_count: 6 }
          });
        } else {
          resolve({
            data: [1, 2, 3],
            paging: {
              cursors: {
                before: '[beforeCursor]',
                after: '[afterCursor]'
              },
              next: '[nextUrl]'
            },
            summary: { total_count: 6 }
          });
        }
      });
    };
    var sourceObject = { getId: function getId() {
        return 'id';
      }, getApi: function getApi() {
        return { call: callStub };
      } };

    var targetClass = function () {
      function targetClass(num) {
        babelHelpers.classCallCheck(this, targetClass);
        this.v = num;
      }

      babelHelpers.createClass(targetClass, null, [{
        key: 'getEndpoint',
        value: function getEndpoint() {}
      }, {
        key: 'Fields',
        get: function get() {}
      }]);
      return targetClass;
    }();

    it('should clear data', function () {
      var cursor = new Cursor(sourceObject, targetClass);
      cursor.push(1, 2, 3);
      cursor.clear();
      cursor.length.should.be.equal(0);
    });

    it('should set data', function () {
      var cursor = new Cursor(sourceObject, targetClass);
      var data = [1, 2, 3];
      cursor.set(data);
      cursor.length.should.be.equal(3);[].concat(babelHelpers.toConsumableArray(cursor)).should.be.eql(data);
    });

    it('should load next and previous pages', function (done) {
      var cursor = new Cursor(sourceObject, targetClass);
      cursor.hasNext().should.be.true;
      cursor.next().then(function () {
        ;[].concat(babelHelpers.toConsumableArray(cursor)).should.be.eql([{ v: 1 }, { v: 2 }, { v: 3 }]);
        cursor.hasNext().should.be.true;
        cursor.hasPrevious().should.be.false;
        cursor.paging.next.should.be.eql('[nextUrl]');
        return cursor.next();
      }).then(function () {
        ;[].concat(babelHelpers.toConsumableArray(cursor)).should.be.eql([{ v: 4 }, { v: 5 }, { v: 6 }]);
        cursor.hasNext().should.be.false;
        cursor.hasPrevious().should.be.true;
        return cursor.next();
      }).catch(function (error) {
        if (error instanceof chai__default.AssertionError) throw error;
        error.should.be.an.instanceof(RangeError);
        return cursor.previous();
      }).then(function () {
        ;[].concat(babelHelpers.toConsumableArray(cursor)).should.be.eql([{ v: 1 }, { v: 2 }, { v: 3 }]);
        cursor.hasNext().should.be.true;
        cursor.hasPrevious().should.be.false;
        return cursor.previous();
      }).catch(function (error) {
        if (error instanceof chai__default.AssertionError) throw error;
        error.should.be.an.instanceof(RangeError);
        done();
      }).catch(done);
    });
  });

  chai.should();

  describe('Exceptions', function () {
    it('should be checked with instanceof', function () {
      var error = new FacebookRequestError({
        body: { error: { message: 'Unsupported get request' } }
      });
      error.should.be.an.instanceof(Error);
      error.should.be.an.instanceof(FacebookRequestError);
    });
  });

});
//# sourceMappingURL=suite.js.map
