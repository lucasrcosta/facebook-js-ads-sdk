import Http from './http'

/**
 * Facebook Ads API
 */
export default class FacebookAdsApi {

  static get VERSION () { return 'v2.6' }
  static get GRAPH () { return 'https://graph.facebook.com' }

  /**
   * @param {string} access_token
   * @param {string} locale
   */
  constructor (access_token, locale = 'en_US') {
    if (!access_token) {
      throw new Error('Access token required')
    }
    this.access_token = access_token
    this.locale = locale
  }

  /**
   * Instantiate an API and store it as the default
   * @param  {string} access_token
   * @param  {string} locale
   * @return {FacebookAdsApi}
   */
  static init (access_token, locale) {
    const api = new this(access_token, locale)
    this.set_default_api(api)
    return api
  }

  static set_default_api (api) {
    this._default_api = api
  }

  static get_default_api () {
    return this._default_api
  }

  call (method, path, params) {
    params.access_token = this.access_token
    if (typeof path !== 'string' && !(path instanceof String)) {
      path = [FacebookAdsApi.GRAPH, FacebookAdsApi.VERSION, ...path].join('/')
    }
    return Http.request(method, path, params)
  }
}
