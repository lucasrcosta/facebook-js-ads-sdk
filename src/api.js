/**
 * Facebook Ads API
 */
export default class FacebookAdsApi {

  static get VERSION () { return '2.6' }
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
    const api = new FacebookAdsApi(access_token, locale)
    FacebookAdsApi.set_default_api(api)
    return api
  }

  static set_default_api (api) {
    FacebookAdsApi._default_api = api
  }

  static get_default_api (api) {
    return FacebookAdsApi._default_api
  }
}
