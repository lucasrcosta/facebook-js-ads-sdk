import FacebookAdsApi from './api'

/**
 * Abstract Object (may or may not have explicitly be a node of the Graph)
 * Manages object data fields and provides matching properties
 */
export class AbstractObject {

  /**
   * @param {object} data Initial data
   */
  constructor (data) {
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
   * @param {string} field
   * @param {mixed} value
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
   * @param {object} data
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
   * @return {object}
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
   * @param  {array} fields
   * @param  {object} data Initial data
   * @param  {string} parentId
   * @param  {FacebookAdApi} api
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
   * @param {object} data
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
   * @return {object}
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
   * @throws {error} if object has no id
   * @return {string}
   */
  getId () {
    if (!this.id) {
      throw new Error(`${this.constructor.name} Id not defined`)
    }
    return this.id
  }

  /**
   * @return {string}
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
    const path = this.getNodePath()
    if (fields) params['fields'] = fields.join(',')
    return new Promise((resolve, reject) => {
      api.call('GET', [path], params)
      .then((data) => resolve(this.setData(data)))
      .catch(reject)
    })
  }

  /**
   * Initialize Cursor to paginate on edges
   * @param  {Object}  targetClass
   * @param  {Array}   fields
   * @param  {Object}  params
   * @param  {Boolean} fetchFirstPage
   * @return {Cursor}
   */
  getEdge (targetClass, fields, params = {}, fetchFirstPage = true) {
    if (fields) params['fields'] = fields.join(',')
    const sourceObject = this
    const cursor = new Cursor(sourceObject, targetClass, params)
    if (fetchFirstPage) {
      return cursor.next()
    }
    return cursor
  }

  /**
   * Read Objects by Ids
   * @param  {array} ids
   * @param  {Array}  fields
   * @param  {Object} params
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
   * @param  {Object}  params
   */
  constructor (sourceObject, targetClass, params) {
    super(0)
    const next = [
      sourceObject.getId(),
      targetClass.getEndpoint()
    ]
    this._api = sourceObject.getApi()
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
          this.set(response.data)
          this.paging = response.paging
          this.summary = response.summary
          resolve(this)
        })
        .catch(reject)
      })
      if (params) params = undefined
      return promise
    }
  }
}
