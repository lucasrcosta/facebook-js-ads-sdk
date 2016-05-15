import AbstractObject from './abstract_object'
import FacebookAdsApi from './../../api'

  /**
   * Abstract Crud Object
   * Facebook Object basic persistence functions
   * @extends AbstractObject
   */
export default class AbstractCrudObject extends AbstractObject {

  /**
   * @param  {array} fields
   * @param  {object} data Initial data
   * @param  {string} parent_id
   * @param  {FacebookAdApi} api
   */
  constructor (data = {}, parent_id, api) {
    super(data)
    this._parent_id = parent_id
    this._api = api || FacebookAdsApi.get_default_api()
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
   * Read Objecs by Ids
   * @param  {array} ids
   * @param  {Object} params
   * @param  {Array}  fields
   * @param  {FacebookAdsApi} [api]
   * @return {Promise}
   */
  static getByIds (ids, params = {}, fields = [], api) {
    api = api || FacebookAdsApi.get_default_api()
    params['fields'] = fields.join(',')
    params['ids'] = ids.join(',')
    return new Promise((resolve, reject) => {
      return api.call(
          'GET',
          [''],
          params
      )
        .then((response) => {
          var result = []
          for (let id in response) {
            let data = response[id]
            let object = new this(data)
            result.push(object)
          }
          resolve(result)
        })
    })
  }
}
