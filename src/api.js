import Http from './http'

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

  call (method, path, params) {
    params.accessToken = this.accessToken
    if (typeof path !== 'string' && !(path instanceof String)) {
      path = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION, ...path].join('/')
    }
    return Http.request(method, path, params)
  }
}
