import { AbstractObject } from './../core'

export default class AdPreview extends AbstractObject {

  static get Field () {
    return Object.freeze({
      body: 'body'
    })
  }

  static get AdFormat () {
    return Object.freeze({
      audience_network_outstream_video: 'AUDIENCE_NETWORK_OUTSTREAM_VIDEO',
      desktop_feed_standard: 'DESKTOP_FEED_STANDARD',
      instagram_standard: 'INSTAGRAM_STANDARD',
      instant_article_standard: 'INSTANT_ARTICLE_STANDARD',
      instream_video_desktop: 'INSTREAM_VIDEO_DESKTOP',
      instream_video_mobile: 'INSTREAM_VIDEO_MOBILE',
      mobile_banner: 'MOBILE_BANNER',
      mobile_feed_basic: 'MOBILE_FEED_BASIC',
      mobile_feed_standard: 'MOBILE_FEED_STANDARD',
      mobile_fullwidth: 'MOBILE_FULLWIDTH',
      mobile_interstitial: 'MOBILE_INTERSTITIAL',
      mobile_medium_rectangle: 'MOBILE_MEDIUM_RECTANGLE',
      mobile_native: 'MOBILE_NATIVE',
      right_column_standard: 'RIGHT_COLUMN_STANDARD'
    })
  }

  static getEndpoint () {
    return 'previews'
  }

}
