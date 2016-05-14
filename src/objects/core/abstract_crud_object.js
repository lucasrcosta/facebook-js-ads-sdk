import AbstractObject from './abstract_object'

  /**
   * Abstract Crud Object
   * Facebook Object basic persistence functions
   * @extends AbstractObject
   */
export default class AbstractCrudObject extends AbstractObject {

  /**
   * @param {array} fields
   * @param {object} data Initial data
   */
  constructor (fields, data = {}) {
    super(fields, data)
    this._changes = {}
  }

  /**
   * Define data getter and setter recording changes
   */
  _defineProperty (field) {
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
    if (this._changes) {
      Object.keys(data).forEach((key) => {
        delete this._changes[key]
      })
    }
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
}
