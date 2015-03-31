define(['chai'], function (chai) { 'use strict';

	chai = 'default' in chai ? chai['default'] : chai;

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

	var accessToken = "CAAGMGXTjBMsBAK7bt0YSQbEP7RWGDOKwuOhsRZANjx59rkDduHpTITUDMRAZAhBKsTfCH7udFihO6nh6S5rjhqJPZA3mUFhdYnh2cWdUh6arpczIZBO5DGJFBoDppdBJSIOnxvBBNBTNevQ8bA81d9v4MfH51PkqdfsNzyAWFOTfyqKZCTA4zfAPmTEFzIxgZD";
	var businessId = "514249121946347";

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

	function ExtendableBuiltin(cls) {
	  function ExtendableBuiltin() {
	    cls.apply(this, arguments);
	  }
	  ExtendableBuiltin.prototype = Object.create(cls.prototype);
	  Object.setPrototypeOf(ExtendableBuiltin, cls);

	  return ExtendableBuiltin;
	}

	// import { mix } from 'mixwith'

	var FacebookError = function (_ExtendableBuiltin) {
	  babelHelpers.inherits(FacebookError, _ExtendableBuiltin);

	  function FacebookError(error) {
	    babelHelpers.classCallCheck(this, FacebookError);

	    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(FacebookError).call(this, error.message));

	    _this.name = 'FacebookError';
	    return _this;
	  }

	  return FacebookError;
	}(ExtendableBuiltin(Error));

	var FacebookRequestError = function (_FacebookError) {
	  babelHelpers.inherits(FacebookRequestError, _FacebookError);

	  function FacebookRequestError(response, method, url) {
	    babelHelpers.classCallCheck(this, FacebookRequestError);

	    var error = response.body.error;

	    var _this2 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(FacebookRequestError).call(this, error.message));

	    _this2.name = 'FacebookRequestError';
	    _this2.message = error.message;
	    _this2.status = response.status;
	    _this2.response = response.body;
	    _this2.method = method;
	    _this2.url = url;
	    return _this2;
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
	  }

	  /**
	   * Instantiate an API and store it as the default
	   * @param  {string} accessToken
	   * @param  {string} locale
	   * @return {FacebookAdsApi}
	   */


	  babelHelpers.createClass(FacebookAdsApi, [{
	    key: 'call',
	    value: function call(method, path) {
	      var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      var url;
	      if (method === 'POST' || method === 'PUT') {
	        var data = params;
	      }
	      if (typeof path !== 'string' && !(path instanceof String)) {
	        url = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION].concat(babelHelpers.toConsumableArray(path)).join('/');
	        params['access_token'] = this.accessToken;
	        url += '?' + FacebookAdsApi._encode_params(params);
	      } else {
	        url = path;
	      }
	      return Http.request(method, url, data).catch(function (response) {
	        return Promise.reject(new FacebookRequestError(response, method, url));
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
	      return Object.keys(params).filter(function (k) {
	        return params[k];
	      }) // TODO ?
	      .map(function (k) {
	        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
	      }).join('&');
	    }
	  }]);
	  return FacebookAdsApi;
	}();

	/**
	 * Abstract Object (may or may not have explicitly be a node of the Graph)
	 * Manages object data fields and provides matching properties
	 */
	var AbstractObject = function () {

	  /**
	   * @param {array} fields
	   * @param {object} data Initial data
	   */

	  function AbstractObject(data) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, AbstractObject);

	    this._data = {};
	    if (this.constructor.fields === undefined) {
	      throw new Error('A "fields" frozen object must be defined in the object class');
	    }
	    this._fields = Object.keys(this.constructor.fields);
	    this._fields.forEach(function (field) {
	      _this._defineProperty(field);
	    });
	    if (data) {
	      this.setData(data);
	    }
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
	    value: function read(fields, params) {
	      var _this7 = this;

	      var api = this.getApi();
	      var path = this.getNodePath();
	      if (fields) params['fields'] = fields.join(',');
	      return new Promise(function (resolve, reject) {
	        api.call('GET', [path], params).then(function (data) {
	          resolve(_this7.setData(data, true));
	        }).catch(reject);
	      });
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
	      var _this8 = this;

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
	            var object = new _this8(data);
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

	    var _this9 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Cursor).call(this, 0));

	    var next = [sourceObject.getId(), targetClass.getEndpoint()];
	    _this9._api = sourceObject.getApi();
	    _this9.paging = { next: next };
	    _this9.summary;

	    _this9.clear = function () {
	      _this9.length = 0;
	    };

	    _this9.set = function (array) {
	      _this9.clear();
	      _this9.push.apply(_this9, babelHelpers.toConsumableArray(array));
	    };

	    _this9.next = function () {
	      if (!_this9.hasNext()) {
	        return Promise.reject(new RangeError('end of pagination'));
	      }
	      return _this9._loadPage(_this9.paging.next);
	    };

	    _this9.hasNext = function () {
	      return Boolean(_this9.paging) && Boolean(_this9.paging.next);
	    };

	    _this9.previous = function () {
	      if (!_this9.hasPrevious()) {
	        return Promise.reject(new RangeError('start of pagination'));
	      }
	      return _this9._loadPage(_this9.paging.previous);
	    };

	    _this9.hasPrevious = function () {
	      return Boolean(_this9.paging) && Boolean(_this9.paging.previous);
	    };

	    _this9._loadPage = function (path) {
	      var promise = new Promise(function (resolve, reject) {
	        _this9._api.call('GET', path, params).then(function (response) {
	          _this9.set(response.data);
	          _this9.paging = response.paging;
	          _this9.summary = response.summary;
	          resolve(_this9);
	        }).catch(reject);
	      });
	      if (params) params = undefined;
	      return promise;
	    };
	    return _this9;
	  }

	  return Cursor;
	}(Array);

	/**
	 * Business
	 * @extends AbstractCrudObject
	 */
	var Business = function (_AbstractCrudObject) {
	  babelHelpers.inherits(Business, _AbstractCrudObject);

	  function Business() {
	    babelHelpers.classCallCheck(this, Business);
	    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Business).apply(this, arguments));
	  }

	  babelHelpers.createClass(Business, null, [{
	    key: 'fields',
	    get: function get() {
	      return Object.freeze({
	        id: 'id',
	        name: 'name',
	        payment_account_id: 'payment_account_id',
	        primary_page: 'primary_page'
	      });
	    }
	  }]);
	  return Business;
	}(AbstractCrudObject);
	/**
	 * User
	 * @extends AbstractCrudObject
	 */
	var User = function (_AbstractCrudObject2) {
	  babelHelpers.inherits(User, _AbstractCrudObject2);

	  function User() {
	    babelHelpers.classCallCheck(this, User);
	    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
	  }

	  babelHelpers.createClass(User, null, [{
	    key: 'fields',
	    get: function get() {
	      return Object.freeze({
	        about: 'about',
	        admin_notes: 'admin_notes',
	        age_range: 'age_range',
	        bio: 'bio',
	        birthday: 'birthday',
	        context: 'context',
	        cover: 'cover',
	        currency: 'currency',
	        devices: 'devices',
	        education: 'education',
	        email: 'email',
	        favorite_athletes: 'favorite_athletes',
	        favorite_teams: 'favorite_teams',
	        first_name: 'first_name',
	        gender: 'gender',
	        hometown: 'hometown',
	        id: 'id',
	        inspirational_people: 'inspirational_people',
	        install_type: 'install_type',
	        installed: 'installed',
	        interested_in: 'interested_in',
	        is_shared_login: 'is_shared_login',
	        is_verified: 'is_verified',
	        labels: 'labels',
	        languages: 'languages',
	        last_name: 'last_name',
	        link: 'link',
	        locale: 'locale',
	        location: 'location',
	        meeting_for: 'meeting_for',
	        middle_name: 'middle_name',
	        name: 'name',
	        name_format: 'name_format',
	        payment_pricepoints: 'payment_pricepoints',
	        political: 'political',
	        public_key: 'public_key',
	        quotes: 'quotes',
	        relationship_status: 'relationship_status',
	        religion: 'religion',
	        security_settings: 'security_settings',
	        shared_login_upgrade_required_by: 'shared_login_upgrade_required_by',
	        significant_other: 'significant_other',
	        sports: 'sports',
	        test_group: 'test_group',
	        third_party_id: 'third_party_id',
	        timezone: 'timezone',
	        token_for_business: 'token_for_business',
	        updated_time: 'updated_time',
	        verified: 'verified',
	        video_upload_limits: 'video_upload_limits',
	        viewer_can_send_gift: 'viewer_can_send_gift',
	        website: 'website',
	        work: 'work'
	      });
	    }
	  }]);
	  return User;
	}(AbstractCrudObject);

	chai.should();
	var api = 1;

	before(function () {
	  api = FacebookAdsApi.init(accessToken);
	});

	describe('Api', function () {
	  it('should reject requests with FacebookRequestError', function (done) {
	    api.call('GET', ['']).then(function () {
	      throw new Error('Promise should have been rejected');
	    }).catch(function (error) {
	      error.should.be.an.instanceof(FacebookRequestError);
	      console.log(error);
	      done();
	    }).catch(done);
	  });
	});

	describe('AbstractCrudObject', function () {
	  it('should read by ids', function (done) {
	    Business.getByIds([businessId]).then(function (objects) {
	      objects.should.be.a('array').and.have.lengthOf(1);
	      objects[0].should.be.an.instanceof(Business);
	      done();
	    }).catch(done);
	  });
	});

});
//# sourceMappingURL=suite.js.map
