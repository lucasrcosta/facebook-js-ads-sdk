import Http from './http'
import { FacebookRequestError } from './exceptions'

/**
 * Facebook Ads API
 */
export default class FacebookAdsApi {

  static get VERSION () { return 'v2.6' }
  static get GRAPH () { return 'https://graph.facebook.com' }

  /**
   * @param {string} accessToken
   * @param {string} locale
   */
  constructor (accessToken, locale = 'en_US') {
    if (!accessToken) {
      throw new Error('Access token required')
    }
    this.accessToken = accessToken
    this.locale = locale
  }

  /**
   * Instantiate an API and store it as the default
   * @param  {string} accessToken
   * @param  {string} locale
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

  call (method, path, params = {}) {
    var url
    if (method === 'POST' || method === 'PUT') {
      var data = params
    }
    if (typeof path !== 'string' && !(path instanceof String)) {
      url = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION, ...path].join('/')
      params['access_token'] = this.accessToken
      url += '?' + FacebookAdsApi._encode_params(params)
    } else {
      url = path
    }
    return Http.request(method, url, data)
    .catch((response) => Promise.reject(new FacebookRequestError(response, method, url, data)))
  }

  static _encode_params (params) {
    return Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')
  }
}
