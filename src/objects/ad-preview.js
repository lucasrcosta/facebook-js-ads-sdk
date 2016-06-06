import { AbstractCrudObject } from './../core'

/**
 * AdPreview
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/generatepreview}
 */
export default class AdPreview extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      body: 'body'
    })
  }

  static get AdFormat () {
    return Object.freeze({
      right_column_standard: 'RIGHT_COLUMN_STANDARD',
      desktop_feed_standard: 'DESKTOP_FEED_STANDARD',
      mobile_feed_standard: 'MOBILE_FEED_STANDARD',
      mobile_feed_basic: 'MOBILE_FEED_BASIC',
      mobile_interstitial: 'MOBILE_INTERSTITIAL',
      mobile_banner: 'MOBILE_BANNER',
      mobile_medium_rectangle: 'MOBILE_MEDIUM_RECTANGLE',
      mobile_native: 'MOBILE_NATIVE',
      instagram_standard: 'INSTAGRAM_STANDARD',
      audience_network_outstream_video: 'AUDIENCE_NETWORK_OUTSTREAM_VIDEO'
    })
  }

  static getEndpoint () {
    return 'previews'
  }
}
