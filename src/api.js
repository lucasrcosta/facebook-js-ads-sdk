import Http from './http'
import { FacebookRequestError } from './exceptions'

/**
 * Facebook Ads API
 */
export default class FacebookAdsApi {

  static get VERSION () { return 'v2.7' }
  static get GRAPH () { return 'https://graph.facebook.com' }

  /**
   * @param {String} accessToken
   * @param {String} [locale]
   */
  constructor (accessToken, locale = 'en_US') {
    if (!accessToken) {
      throw new Error('Access token required')
    }
    this.accessToken = accessToken
    this.locale = locale
    this._debug = false
  }

  /**
   * Instantiate an API and store it as the default
   * @param  {String} accessToken
   * @param  {String} [locale]
   * @return {FacebookAdsApi}
   */
  static init (accessToken, locale) {
    const api = new this(accessToken, locale)
    this.setDefaultApi(api)
    return api
  }

  static setDefaultApi (api) {
    this._defaultApi = api
  }

  static getDefaultApi () {
    return this._defaultApi
  }

  setDebug (flag) {
    this._debug = flag
    return this
  }

  /**
   * Http Request
   * @param  {String} method
   * @param  {String} path
   * @param  {Object} [params]
   * @return {Promise}
   */
  call (method, path, params = {}) {
    var url
    if (method === 'POST' || method === 'PUT') {
      var data = params
      params = {}
    }
    if (typeof path !== 'string' && !(path instanceof String)) {
      url = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION, ...path].join('/')
      params['access_token'] = this.accessToken
      url += `?${FacebookAdsApi._encodeParams(params)}`
    } else {
      url = path
    }

    return Http.request(method, url, data)
    .then((response) => {
      if (this._debug) console.log(`200 ${method} ${url} ${data ? JSON.stringify(data) : ''}`)
      return Promise.resolve(response)
    })
    .catch((response) => {
      if (this._debug) {
        console.log(`${response.status} ${method} ${url} ${data ? JSON.stringify(data) : ''}`)
      }
      throw new FacebookRequestError(response, method, url, data)
    })
  }

  static _encodeParams (params) {
    return Object.keys(params).map((key) => {
      var param = params[key]
      if (typeof param === 'object') {
        param = param ? JSON.stringify(param) : ''
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(param)}`
    }).join('&')
  }
}
