import FacebookAdsApi from './api'

/**
 * Abstract Object
 * Manages object data fields and provides matching properties
 */
export class AbstractObject {

  constructor () {
    this._data = {}
    if (this.constructor.Fields === undefined) {
      throw new Error('A "Fields" frozen object must be defined in the object class')
    }
    this._fields = Object.keys(this.constructor.Fields)
    this._fields.forEach((field) => {
      this._defineProperty(field)
    })
  }

  /**
   * Define data getter and setter field
   * @param {String} field
   */
  _defineProperty (field) {
    Object.defineProperty(this, field, {
      get: () => this._data[field],
      set: (value) => { this._data[field] = value },
      enumerable: true
    })
  }

  /**
   * Set data field
   * @param {String} field
   * @param {Mixed} value
   * @return this
   */
  set (field, value) {
    if (this._fields.indexOf(field) < 0) {
      this._defineProperty(field)
    }
    this[field] = value
    return this
  }

  /**
   * Set multiple data fields
   * @param {Object} data
   * @return this
   */
  setData (data) {
    Object.keys(data).forEach((key) => {
      this.set(key, data[key])
    })
    return this
  }

  /**
   * Export object data
   * @return {Object}
   */
  exportData () {
    return this._data
  }
}

/**
 * Abstract Crud Object
 * Facebook Object basic persistence functions
 * @extends AbstractObject
 */
export class AbstractCrudObject extends AbstractObject {

  /**
   * @param  {Object} data Initial data
   * @param  {String} parentId
   * @param  {FacebookAdApi} [api]
   */
  constructor (data, parentId, api) {
    super(data)
    this._parentId = parentId
    this._api = api || FacebookAdsApi.getDefaultApi()
    if (data) {
      super.setData(data)
    }
  }

  /**
   * Define data getter and setter recording changes
   * @param {String} field
   */
  _defineProperty (field) {
    if (this._changes === undefined) {
      this._changes = {}
    }
    Object.defineProperty(this, field, {
      get: () => this._data[field],
      set: (value) => {
        this._changes[field] = value
        this._data[field] = value
      },
      enumerable: true
    })
  }

  /**
   * Set object data as if it were read from the server. Wipes related changes
   * @param {Object} data
   * @return this
   */
  setData (data) {
    super.setData(data)
    Object.keys(data).forEach((key) => {
      delete this._changes[key]
    })
    return this
  }

  /**
   * Export changed object data
   * @return {Object}
   */
  exportData () {
    return this._changes
  }

  /**
   * Clear change history
   * @return this
   */
  clearHistory () {
    this._changes = {}
    return this
  }

  /**
   * @throws {Error} if object has no id
   * @return {String}
   */
  getId () {
    if (!this.id) {
      throw new Error(`${this.constructor.name} Id not defined`)
    }
    return this.id
  }

  /**
   * @throws {Error} if object has no parent id
   * @return {String}
   */
  getParentId () {
    if (!this._parentId) {
      throw new Error(`${this.constructor.name} parentId not defined`)
    }
    return this._parentId
  }

  /**
   * @return {String}
   */
  getNodePath () {
    return this.getId()
  }

  /**
   * Return object API instance
   * @throws {Error} if object doesn't hold an API
   * @return {FacebookAdsApi}
   */
  getApi () {
    const api = this._api
    if (!api) {
      throw new Error(`${this.constructor.name} does not yet have an associated api object.\n
        Did you forget to instantiate an API session with: "FacebookAdsApi.init"?`
      )
    }
    return api
  }

  /**
   * Read object data
   * @param   {Array}   [fields]
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  read (fields, params = {}) {
    const api = this.getApi()
    const path = [this.getNodePath()]
    if (fields) params['fields'] = fields.join(',')
    return new Promise((resolve, reject) => {
      api.call('GET', path, params)
      .then((data) => resolve(this.setData(data)))
      .catch(reject)
    })
  }

  /**
   * Create object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  create (params = {}) {
    const api = this.getApi()
    const path = [this.getParentId(), this.constructor.getEndpoint()]
    params = Object.assign(params, this.exportData())
    return new Promise((resolve, reject) => {
      api.call('POST', path, params)
      .then((data) => resolve(this.setData(data)))
      .catch(reject)
    })
  }

  /**
   * Update object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  update (params = {}) {
    const api = this.getApi()
    const path = [this.getNodePath()]
    params = Object.assign(params, this.exportData())
    return new Promise((resolve, reject) => {
      api.call('POST', path, params)
      .then((data) => resolve(data))
      .catch(reject)
    })
  }

  /**
   * Delete object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  delete (params = {}) {
    const api = this.getApi()
    const path = [this.getNodePath()]
    params = Object.assign(params, this.exportData())
    return new Promise((resolve, reject) => {
      api.call('DELETE', path, params)
      .then((data) => resolve(data))
      .catch(reject)
    })
  }

  /**
   * Create or Update object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  save (params) {
    if (this.id) return this.update(params)
    return this.create(params)
  }

  /**
   * Initialize Cursor to paginate on edges
   * @param  {Object}  targetClass
   * @param  {Array}   [fields]
   * @param  {Object}  [params]
   * @param  {Boolean} [fetchFirstPage]
   * @param  {String}  [endpoint]
   * @return {Cursor}
   */
  getEdge (targetClass, fields, params = {}, fetchFirstPage = true, enpoint) {
    if (fields) params['fields'] = fields.join(',')
    const sourceObject = this
    const cursor = new Cursor(sourceObject, targetClass, params, enpoint)
    if (fetchFirstPage) {
      return cursor.next()
    }
    return cursor
  }

  /**
   * Read Objects by Ids
   * @param  {Array}          ids
   * @param  {Array}          [fields]
   * @param  {Object}         [params]
   * @param  {FacebookAdsApi} [api]
   * @return {Promise}
   */
  static getByIds (ids, fields, params = {}, api) {
    api = api || FacebookAdsApi.getDefaultApi()
    if (fields) params['fields'] = fields.join(',')
    params['ids'] = ids.join(',')
    return new Promise((resolve, reject) => {
      return api.call('GET', [''], params)
      .then((response) => {
        var result = []
        for (let id in response) {
          let data = response[id]
          let object = new this(data)
          result.push(object)
        }
        resolve(result)
      })
      .catch(reject)
    })
  }
}

/**
 * Cursor
 * Iterates over edge objects and controls pagination
 */
export class Cursor extends Array {

  /**
   * @param  {Object} sourceObject
   * @param  {Object} targetClass
   * @param  {Object} [params]
   * @param  {String} [endpoint]
   */
  constructor (sourceObject, targetClass, params, endpoint) {
    super(0)
    const next = [sourceObject.getId()]
    next.push(endpoint || targetClass.getEndpoint())
    this._api = sourceObject.getApi()
    this._targetClass = targetClass
    this.paging = {next: next}
    this.summary

    this.clear = () => {
      this.length = 0
    }

    this.set = (array) => {
      this.clear()
      this.push(...array)
    }

    this.next = () => {
      if (!this.hasNext()) {
        return Promise.reject(new RangeError('end of pagination'))
      }
      return this._loadPage(this.paging.next)
    }

    this.hasNext = () => {
      return Boolean(this.paging) && Boolean(this.paging.next)
    }

    this.previous = () => {
      if (!this.hasPrevious()) {
        return Promise.reject(new RangeError('start of pagination'))
      }
      return this._loadPage(this.paging.previous)
    }

    this.hasPrevious = () => {
      return Boolean(this.paging) && Boolean(this.paging.previous)
    }

    this._loadPage = (path) => {
      const promise = new Promise((resolve, reject) => {
        this._api.call('GET', path, params)
        .then((response) => {
          const objects = this._buildObjectsFromResponse(response)
          this.set(objects)
          this.paging = response.paging
          this.summary = response.summary
          resolve(this)
        })
        .catch(reject)
      })
      if (params) params = undefined
      return promise
    }

    this._buildObjectsFromResponse = (response) => {
      return response.data.map((item) => new this._targetClass(item, undefined, this._api))
    }
  }
}
