import { AbstractCrudObject } from './../core'
import AdPreview from './ad-preview'

/**
 * AdCreative
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-creative}
 */
export default class AdCreative extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      id: 'id',
      actor_id: 'actor_id',
      actor_image_hash: 'actor_image_hash',
      actor_image_url: 'actor_image_url',
      actor_name: 'actor_name',
      adlabels: 'adlabels',
      applink_treatment: 'applink_treatment',
      body: 'body',
      call_to_action_type: 'call_to_action_type',
      image_crops: 'image_crops',
      image_hash: 'image_hash',
      image_url: 'image_url',
      instagram_actor_id: 'instagram_actor_id',
      instagram_permalink_url: 'instagram_permalink_url',
      instagram_story_id: 'instagram_story_id',
      link_og_id: 'link_og_id',
      link_url: 'link_url',
      name: 'name',
      object_id: 'object_id',
      object_story_id: 'object_story_id',
      object_story_spec: 'object_story_spec',
      object_type: 'object_type',
      object_url: 'object_url',
      platform_customizations: 'platform_customizations',
      product_set_id: 'product_set_id',
      run_status: 'run_status',
      template_url: 'template_url',
      thumbnail_url: 'thumbnail_url',
      title: 'title',
      url_tags: 'url_tags',
      use_page_actor_override: 'use_page_actor_override',
      action_spec: 'action_spec',
      call_to_action: 'call_to_action',
      dynamic_ad_voice: 'dynamic_ad_voice',
      follow_redirect: 'follow_redirect',
      image_file: 'image_file',
      object_instagram_id: 'object_instagram_id',
      place_page_set_id: 'place_page_set_id'
    })
  }

  static get ApplinkTreatment () {
    return Object.freeze({
      deeplink_with_web_fallback: 'deeplink_with_web_fallback',
      deeplink_with_appstore_fallback: 'deeplink_with_appstore_fallback',
      web_only: 'web_only'
    })
  }

  static get CallToActionType () {
    return Object.freeze({
      open_link: 'OPEN_LINK',
      like_page: 'LIKE_PAGE',
      shop_now: 'SHOP_NOW',
      play_game: 'PLAY_GAME',
      install_app: 'INSTALL_APP',
      use_app: 'USE_APP',
      install_mobile_app: 'INSTALL_MOBILE_APP',
      use_mobile_app: 'USE_MOBILE_APP',
      book_travel: 'BOOK_TRAVEL',
      listen_music: 'LISTEN_MUSIC',
      watch_video: 'WATCH_VIDEO',
      learn_more: 'LEARN_MORE',
      sign_up: 'SIGN_UP',
      download: 'DOWNLOAD',
      watch_more: 'WATCH_MORE',
      no_button: 'NO_BUTTON',
      call_now: 'CALL_NOW',
      buy_now: 'BUY_NOW',
      get_offer: 'GET_OFFER',
      get_offer_view: 'GET_OFFER_VIEW',
      get_directions: 'GET_DIRECTIONS',
      message_page: 'MESSAGE_PAGE',
      subscribe: 'SUBSCRIBE',
      sell_now: 'SELL_NOW',
      donate_now: 'DONATE_NOW',
      get_quote: 'GET_QUOTE',
      contact_us: 'CONTACT_US',
      record_now: 'RECORD_NOW',
      vote_now: 'VOTE_NOW',
      open_movies: 'OPEN_MOVIES'
    })
  }

  static get ObjectType () {
    return Object.freeze({
      application: 'APPLICATION',
      domain: 'DOMAIN',
      event: 'EVENT',
      offer: 'OFFER',
      page: 'PAGE',
      photo: 'PHOTO',
      share: 'SHARE',
      status: 'STATUS',
      store_item: 'STORE_ITEM',
      video: 'VIDEO',
      invalid: 'INVALID',
      action_spec: 'ACTION_SPEC',
      instagram_media: 'INSTAGRAM_MEDIA'
    })
  }

  static get RunStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      deleted: 'DELETED'
    })
  }

  static get DynamicAdVoice () {
    return Object.freeze({
      dynamic: 'DYNAMIC',
      story_owner: 'STORY_OWNER'
    })
  }

  static get Operator () {
    return Object.freeze({
      all: 'ALL',
      any: 'ANY'
    })
  }

  static getEndpoint () {
    return 'adcreatives'
  }

  getPreviews (fields, params, fetchFirstPage) {
    return this.getEdge(AdPreview, fields, params, fetchFirstPage)
  }
}
