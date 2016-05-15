/**
 * Abstract Object (may or may not have explicitly be a node of the Graph)
 * Manages object data fields and provides matching properties
 */
export default class AbstractObject {

  /**
   * @param {array} fields
   * @param {object} data Initial data
   */
  constructor (data = {}) {
    this._data = {}
    if (this.constructor.fields === undefined) {
      throw new Error('A "fields" frozen object must be defined in the object class')
    }
    this._fields = Object.keys(this.constructor.fields)
    this._fields.forEach((field) => {
      this._defineProperty(field)
    })
    if (data) this.setData(data)
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
