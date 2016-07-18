/**
 * Isomorphic Http Promise Requests Class
 */
class Http {

  /**
   * Request
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @return  {Promise}
   */
  static request (method, url, data) {
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      return Http.xmlHttpRequest(method, url, data)
    }
    return Http.requestPromise(method, url, data)
  }

  /**
   * XmlHttpRequest request
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @return  {Promise}
   */
  static xmlHttpRequest (method, url, data) {
    return new Promise((resolve, reject) => {
      const request = new window.XMLHttpRequest()
      request.open(method, url)
      request.onload = function () {
        try {
          const response = JSON.parse(request.response)

          if (request.status === 200) {
            resolve(response)
          } else {
            reject({
              body: response,
              status: request.status
            })
          }
        } catch (e) {
          reject({
            body: request.responseText,
            status: request.status
          })
        }
      }
      request.setRequestHeader('Content-Type', 'application/json')
      request.setRequestHeader('Accept', 'application/json')
      request.send(JSON.stringify(data))
    })
  }

  /**
   * Request Promise
   * @param   {String}  method
   * @param   {String}  url
   * @param   {Object}  [data]
   * @return  {Promise}
   */
  static requestPromise (method, url, data) {
    const rp = require('request-promise')
    const options = {
      method: method,
      uri: url,
      json: true,
      headers: { 'User-Agent': 'Facebook-JS-Ads-SDK/' + FacebookAdsApi.VERSION }
    }
    if (data) {
      options.body = data
    }
    return rp(options).catch((response) => {
      response = {
        body: response.error ? response.error : response,
        status: response.statusCode
      }
      throw response
    })
  }

}

function FacebookError (error) {
  this.name = 'FacebookError'
  this.message = error.message
  this.stack = (new Error()).stack
}
FacebookError.prototype = Object.create(Error.prototype)
FacebookError.prototype.constructor = FacebookError

/**
 * Raised when an api request fails.
 */
class FacebookRequestError extends FacebookError {

  /**
   * @param  {[Object}  response
   * @param  {String}   method
   * @param  {String}   url
   * @param  {Object}   data
   */
  constructor (response, method, url, data) {
    let error = response.body.error
    let message = error.error_user_msg
      ? `${error.error_user_title}: ${error.error_user_msg}`
      : error.message
    super(message)
    this.name = 'FacebookRequestError'
    this.message = message
    this.status = response.status
    this.response = response.body
    this.method = method
    this.url = url
    if (data) this.data = data
  }
}

/**
 * Facebook Ads API
 */
class FacebookAdsApi {

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

/**
 * Abstract Object
 * Manages object data fields and provides matching properties
 */
class AbstractObject {

  constructor () {
    this._data = {}
    if (this.constructor.Fields === undefined) {
      throw new Error('A "Fields" frozen object must be defined in the object class')
    }
    this._fields = Object.keys(this.constructor.Fields)
    this._fields.forEach((field) => {
      this._defineProperty(field)
    })
  }

  /**
   * Define data getter and setter field
   * @param {String} field
   */
  _defineProperty (field) {
    Object.defineProperty(this, field, {
      get: () => this._data[field],
      set: (value) => { this._data[field] = value },
      enumerable: true
    })
  }

  /**
   * Set data field
   * @param {String} field
   * @param {Mixed} value
   * @return this
   */
  set (field, value) {
    if (this._fields.indexOf(field) < 0) {
      this._defineProperty(field)
    }
    this[field] = value
    return this
  }

  /**
   * Set multiple data fields
   * @param {Object} data
   * @return this
   */
  setData (data) {
    Object.keys(data).forEach((key) => {
      this.set(key, data[key])
    })
    return this
  }

  /**
   * Export object data
   * @return {Object}
   */
  exportData () {
    return this._data
  }
}

/**
 * Abstract Crud Object
 * Facebook Object basic persistence functions
 * @extends AbstractObject
 */
class AbstractCrudObject extends AbstractObject {

  /**
   * @param  {Object} data Initial data
   * @param  {String} parentId
   * @param  {FacebookAdApi} [api]
   */
  constructor (data, parentId, api) {
    super(data)
    this._parentId = parentId
    this._api = api || FacebookAdsApi.getDefaultApi()
    if (data) {
      super.setData(data)
    }
  }

  /**
   * Define data getter and setter recording changes
   * @param {String} field
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
   * @param {Object} data
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
   * @return {Object}
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
   * @throws {Error} if object has no id
   * @return {String}
   */
  getId () {
    if (!this.id) {
      throw new Error(`${this.constructor.name} Id not defined`)
    }
    return this.id
  }

  /**
   * @throws {Error} if object has no parent id
   * @return {String}
   */
  getParentId () {
    if (!this._parentId) {
      throw new Error(`${this.constructor.name} parentId not defined`)
    }
    return this._parentId
  }

  /**
   * @return {String}
   */
  getNodePath () {
    return this.getId()
  }

  /**
   * Return object API instance
   * @throws {Error} if object doesn't hold an API
   * @return {FacebookAdsApi}
   */
  getApi () {
    const api = this._api
    if (!api) {
      throw new Error(`${this.constructor.name} does not yet have an associated api object.\n
        Did you forget to instantiate an API session with: "FacebookAdsApi.init"?`
      )
    }
    return api
  }

  /**
   * Read object data
   * @param   {Array}   [fields]
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  read (fields, params = {}) {
    const api = this.getApi()
    const path = [this.getNodePath()]
    if (fields) params['fields'] = fields.join(',')
    return new Promise((resolve, reject) => {
      api.call('GET', path, params)
      .then((data) => resolve(this.setData(data)))
      .catch(reject)
    })
  }

  /**
   * Create object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  create (params = {}) {
    const api = this.getApi()
    const path = [this.getParentId(), this.constructor.getEndpoint()]
    params = Object.assign(params, this.exportData())
    return new Promise((resolve, reject) => {
      api.call('POST', path, params)
      .then((data) => resolve(this.setData(data)))
      .catch(reject)
    })
  }

  /**
   * Update object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  update (params = {}) {
    const api = this.getApi()
    const path = [this.getNodePath()]
    params = Object.assign(params, this.exportData())
    return new Promise((resolve, reject) => {
      api.call('POST', path, params)
      .then((data) => resolve(data))
      .catch(reject)
    })
  }

  /**
   * Delete object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  delete (params = {}) {
    const api = this.getApi()
    const path = [this.getNodePath()]
    params = Object.assign(params, this.exportData())
    return new Promise((resolve, reject) => {
      api.call('DELETE', path, params)
      .then((data) => resolve(data))
      .catch(reject)
    })
  }

  /**
   * Create or Update object
   * @param   {Object}  [params]
   * @return  {Promise}
   */
  save (params) {
    if (this.id) return this.update(params)
    return this.create(params)
  }

  /**
   * Initialize Cursor to paginate on edges
   * @param  {Object}  targetClass
   * @param  {Array}   [fields]
   * @param  {Object}  [params]
   * @param  {Boolean} [fetchFirstPage]
   * @param  {String}  [endpoint]
   * @return {Cursor}
   */
  getEdge (targetClass, fields, params = {}, fetchFirstPage = true, enpoint) {
    if (fields) params['fields'] = fields.join(',')
    const sourceObject = this
    const cursor = new Cursor(sourceObject, targetClass, params, enpoint)
    if (fetchFirstPage) {
      return cursor.next()
    }
    return cursor
  }

  /**
   * Read Objects by Ids
   * @param  {Array}          ids
   * @param  {Array}          [fields]
   * @param  {Object}         [params]
   * @param  {FacebookAdsApi} [api]
   * @return {Promise}
   */
  static getByIds (ids, fields, params = {}, api) {
    api = api || FacebookAdsApi.getDefaultApi()
    if (fields) params['fields'] = fields.join(',')
    params['ids'] = ids.join(',')
    return new Promise((resolve, reject) => {
      return api.call('GET', [''], params)
      .then((response) => {
        var result = []
        for (let id in response) {
          let data = response[id]
          let object = new this(data)
          result.push(object)
        }
        resolve(result)
      })
      .catch(reject)
    })
  }
}

/**
 * Cursor
 * Iterates over edge objects and controls pagination
 */
class Cursor extends Array {

  /**
   * @param  {Object} sourceObject
   * @param  {Object} targetClass
   * @param  {Object} [params]
   * @param  {String} [endpoint]
   */
  constructor (sourceObject, targetClass, params, endpoint) {
    super(0)
    const next = [sourceObject.getId()]
    next.push(endpoint || targetClass.getEndpoint())
    this._api = sourceObject.getApi()
    this._targetClass = targetClass
    this.paging = {next: next}
    this.summary

    this.clear = () => {
      this.length = 0
    }

    this.set = (array) => {
      this.clear()
      this.push(...array)
    }

    this.next = () => {
      if (!this.hasNext()) {
        return Promise.reject(new RangeError('end of pagination'))
      }
      return this._loadPage(this.paging.next)
    }

    this.hasNext = () => {
      return Boolean(this.paging) && Boolean(this.paging.next)
    }

    this.previous = () => {
      if (!this.hasPrevious()) {
        return Promise.reject(new RangeError('start of pagination'))
      }
      return this._loadPage(this.paging.previous)
    }

    this.hasPrevious = () => {
      return Boolean(this.paging) && Boolean(this.paging.previous)
    }

    this._loadPage = (path) => {
      const promise = new Promise((resolve, reject) => {
        this._api.call('GET', path, params)
        .then((response) => {
          const objects = this._buildObjectsFromResponse(response)
          this.set(objects)
          this.paging = response.paging
          this.summary = response.summary
          resolve(this)
        })
        .catch(reject)
      })
      if (params) params = undefined
      return promise
    }

    this._buildObjectsFromResponse = (response) => {
      return response.data.map((item) => new this._targetClass(item, undefined, this._api))
    }
  }
}

/**
 * AdPreview
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/generatepreview}
 */
class AdPreview extends AbstractCrudObject {
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

/**
 * AdCreative
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-creative}
 */
class AdCreative extends AbstractCrudObject {
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

/**
 * Insights
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ads-insights}
 * @see {@link https://developers.facebook.com/docs/marketing-api/insights-api}
 */
class Insights extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      account_name: 'account_name',
      action_values: 'action_values',
      actions: 'actions',
      ad_id: 'ad_id',
      ad_name: 'ad_name',
      adset_id: 'adset_id',
      adset_name: 'adset_name',
      age: 'age',
      app_store_clicks: 'app_store_clicks',
      buying_type: 'buying_type',
      call_to_action_clicks: 'call_to_action_clicks',
      campaign_id: 'campaign_id',
      campaign_name: 'campaign_name',
      canvas_avg_view_percent: 'canvas_avg_view_percent',
      canvas_avg_view_time: 'canvas_avg_view_time',
      clicks: 'clicks',
      cost_per_10_sec_video_view: 'cost_per_10_sec_video_view',
      cost_per_action_type: 'cost_per_action_type',
      cost_per_estimated_ad_recallers: 'cost_per_estimated_ad_recallers',
      cost_per_inline_link_click: 'cost_per_inline_link_click',
      cost_per_inline_post_engagement: 'cost_per_inline_post_engagement',
      cost_per_total_action: 'cost_per_total_action',
      cost_per_unique_action_type: 'cost_per_unique_action_type',
      cost_per_unique_click: 'cost_per_unique_click',
      cost_per_unique_inline_link_click: 'cost_per_unique_inline_link_click',
      country: 'country',
      cpc: 'cpc',
      cpm: 'cpm',
      cpp: 'cpp',
      ctr: 'ctr',
      date_start: 'date_start',
      date_stop: 'date_stop',
      deeplink_clicks: 'deeplink_clicks',
      estimated_ad_recall_rate: 'estimated_ad_recall_rate',
      estimated_ad_recallers: 'estimated_ad_recallers',
      frequency: 'frequency',
      frequency_value: 'frequency_value',
      gender: 'gender',
      hourly_stats_aggregated_by_advertiser_time_zone: 'hourly_stats_aggregated_by_advertiser_time_zone',
      hourly_stats_aggregated_by_audience_time_zone: 'hourly_stats_aggregated_by_audience_time_zone',
      impression_device: 'impression_device',
      impressions: 'impressions',
      inline_link_click_ctr: 'inline_link_click_ctr',
      inline_link_clicks: 'inline_link_clicks',
      inline_post_engagement: 'inline_post_engagement',
      newsfeed_avg_position: 'newsfeed_avg_position',
      newsfeed_clicks: 'newsfeed_clicks',
      newsfeed_impressions: 'newsfeed_impressions',
      objective: 'objective',
      place_page_id: 'place_page_id',
      place_page_name: 'place_page_name',
      placement: 'placement',
      product_id: 'product_id',
      reach: 'reach',
      region: 'region',
      relevance_score: 'relevance_score',
      social_clicks: 'social_clicks',
      social_impressions: 'social_impressions',
      social_reach: 'social_reach',
      social_spend: 'social_spend',
      spend: 'spend',
      total_action_value: 'total_action_value',
      total_actions: 'total_actions',
      total_unique_actions: 'total_unique_actions',
      unique_actions: 'unique_actions',
      unique_clicks: 'unique_clicks',
      unique_ctr: 'unique_ctr',
      unique_impressions: 'unique_impressions',
      unique_inline_link_click_ctr: 'unique_inline_link_click_ctr',
      unique_inline_link_clicks: 'unique_inline_link_clicks',
      unique_link_clicks_ctr: 'unique_link_clicks_ctr',
      unique_social_clicks: 'unique_social_clicks',
      unique_social_impressions: 'unique_social_impressions',
      video_10_sec_watched_actions: 'video_10_sec_watched_actions',
      video_15_sec_watched_actions: 'video_15_sec_watched_actions',
      video_30_sec_watched_actions: 'video_30_sec_watched_actions',
      video_avg_pct_watched_actions: 'video_avg_pct_watched_actions',
      video_avg_sec_watched_actions: 'video_avg_sec_watched_actions',
      video_complete_watched_actions: 'video_complete_watched_actions',
      video_p100_watched_actions: 'video_p100_watched_actions',
      video_p25_watched_actions: 'video_p25_watched_actions',
      video_p50_watched_actions: 'video_p50_watched_actions',
      video_p75_watched_actions: 'video_p75_watched_actions',
      video_p95_watched_actions: 'video_p95_watched_actions',
      website_clicks: 'website_clicks',
      website_ctr: 'website_ctr'
    })
  }

  static get ActionAttributionWindows () {
    return Object.freeze({
      value_1d_view: '1d_view',
      value_7d_view: '7d_view',
      value_28d_view: '28d_view',
      value_1d_click: '1d_click',
      value_7d_click: '7d_click',
      value_28d_click: '28d_click',
      value_default: 'default'
    })
  }

  static get ActionBreakdowns () {
    return Object.freeze({
      action_carousel_card_id: 'action_carousel_card_id',
      action_carousel_card_name: 'action_carousel_card_name',
      action_destination: 'action_destination',
      action_device: 'action_device',
      action_target_id: 'action_target_id',
      action_type: 'action_type',
      action_video_type: 'action_video_type'
    })
  }

  static get ActionReportTime () {
    return Object.freeze({
      impression: 'impression',
      conversion: 'conversion'
    })
  }

  static get Breakdowns () {
    return Object.freeze({
      age: 'age',
      country: 'country',
      gender: 'gender',
      frequency_value: 'frequency_value',
      hourly_stats_aggregated_by_advertiser_time_zone: 'hourly_stats_aggregated_by_advertiser_time_zone',
      hourly_stats_aggregated_by_audience_time_zone: 'hourly_stats_aggregated_by_audience_time_zone',
      impression_device: 'impression_device',
      place_page_id: 'place_page_id',
      placement: 'placement',
      placement_merge_rhc: 'placement_merge_rhc',
      product_id: 'product_id',
      region: 'region'
    })
  }

  static get DatePreset () {
    return Object.freeze({
      today: 'today',
      yesterday: 'yesterday',
      last_3_days: 'last_3_days',
      this_week: 'this_week',
      last_week: 'last_week',
      last_7_days: 'last_7_days',
      last_14_days: 'last_14_days',
      last_28_days: 'last_28_days',
      last_30_days: 'last_30_days',
      last_90_days: 'last_90_days',
      this_month: 'this_month',
      last_month: 'last_month',
      this_quarter: 'this_quarter',
      last_3_months: 'last_3_months',
      lifetime: 'lifetime'
    })
  }

  static get Level () {
    return Object.freeze({
      ad: 'ad',
      adset: 'adset',
      campaign: 'campaign',
      account: 'account'
    })
  }

  static get SummaryActionBreakdowns () {
    return Object.freeze({
      action_carousel_card_id: 'action_carousel_card_id',
      action_carousel_card_name: 'action_carousel_card_name',
      action_destination: 'action_destination',
      action_device: 'action_device',
      action_target_id: 'action_target_id',
      action_type: 'action_type',
      action_video_type: 'action_video_type'
    })
  }

  static get Summary () {
    return Object.freeze({
      id: 'id',
      account_id: 'account_id',
      async_percent_completion: 'async_percent_completion',
      async_status: 'async_status',
      date_start: 'date_start',
      date_stop: 'date_stop',
      emails: 'emails',
      friendly_name: 'friendly_name',
      is_bookmarked: 'is_bookmarked',
      is_running: 'is_running',
      schedule_id: 'schedule_id',
      time_completed: 'time_completed',
      time_ref: 'time_ref'
    })
  }

  static getEndpoint () {
    return 'insights'
  }
}

/**
 * Ad
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/adgroup}
 */
class Ad extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      id: 'id',
      account_id: 'account_id',
      ad_review_feedback: 'ad_review_feedback',
      adlabels: 'adlabels',
      adset: 'adset',
      adset_id: 'adset_id',
      bid_amount: 'bid_amount',
      bid_info: 'bid_info',
      bid_type: 'bid_type',
      campaign: 'campaign',
      campaign_id: 'campaign_id',
      configured_status: 'configured_status',
      conversion_specs: 'conversion_specs',
      created_time: 'created_time',
      creative: 'creative',
      effective_status: 'effective_status',
      last_updated_by_app_id: 'last_updated_by_app_id',
      name: 'name',
      recommendations: 'recommendations',
      status: 'status',
      tracking_specs: 'tracking_specs',
      updated_time: 'updated_time',
      date_format: 'date_format',
      display_sequence: 'display_sequence',
      execution_options: 'execution_options',
      redownload: 'redownload'
    })
  }

  static get BidType () {
    return Object.freeze({
      cpc: 'CPC',
      cpm: 'CPM',
      multi_premium: 'MULTI_PREMIUM',
      absolute_ocpm: 'ABSOLUTE_OCPM',
      cpa: 'CPA'
    })
  }

  static get ConfiguredStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      archived: 'ARCHIVED'
    })
  }

  static get EffectiveStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      pending_review: 'PENDING_REVIEW',
      disapproved: 'DISAPPROVED',
      preapproved: 'PREAPPROVED',
      pending_billing_info: 'PENDING_BILLING_INFO',
      campaign_paused: 'CAMPAIGN_PAUSED',
      archived: 'ARCHIVED',
      adset_paused: 'ADSET_PAUSED'
    })
  }

  static get Status () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      archived: 'ARCHIVED'
    })
  }

  static get DatePreset () {
    return Object.freeze({
      today: 'today',
      yesterday: 'yesterday',
      last_3_days: 'last_3_days',
      this_week: 'this_week',
      last_week: 'last_week',
      last_7_days: 'last_7_days',
      last_14_days: 'last_14_days',
      last_28_days: 'last_28_days',
      last_30_days: 'last_30_days',
      last_90_days: 'last_90_days',
      this_month: 'this_month',
      last_month: 'last_month',
      this_quarter: 'this_quarter',
      last_3_months: 'last_3_months',
      lifetime: 'lifetime'
    })
  }

  static get ExecutionOptions () {
    return Object.freeze({
      validate_only: 'VALIDATE_ONLY',
      synchronous_ad_review: 'SYNCHRONOUS_AD_REVIEW',
      include_recommendations: 'INCLUDE_RECOMMENDATIONS'
    })
  }

  static get Operator () {
    return Object.freeze({
      all: 'ALL',
      any: 'ANY'
    })
  }

  static getEndpoint () {
    return 'ads'
  }

  getAdCreatives (fields, params, fetchFirstPage) {
    return this.getEdge(AdCreative, fields, params, fetchFirstPage)
  }

  getInsights (fields, params, fetchFirstPage) {
    return this.getEdge(Insights, fields, params, fetchFirstPage)
  }
}

/**
 * AdSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-campaign}
 */
class AdSet extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      adlabels: 'adlabels',
      adset_schedule: 'adset_schedule',
      bid_amount: 'bid_amount',
      bid_info: 'bid_info',
      billing_event: 'billing_event',
      budget_remaining: 'budget_remaining',
      campaign: 'campaign',
      campaign_id: 'campaign_id',
      configured_status: 'configured_status',
      created_time: 'created_time',
      creative_sequence: 'creative_sequence',
      daily_budget: 'daily_budget',
      effective_status: 'effective_status',
      end_time: 'end_time',
      frequency_cap: 'frequency_cap',
      frequency_cap_reset_period: 'frequency_cap_reset_period',
      frequency_control_specs: 'frequency_control_specs',
      id: 'id',
      is_autobid: 'is_autobid',
      lifetime_budget: 'lifetime_budget',
      lifetime_frequency_cap: 'lifetime_frequency_cap',
      lifetime_imps: 'lifetime_imps',
      name: 'name',
      optimization_goal: 'optimization_goal',
      pacing_type: 'pacing_type',
      promoted_object: 'promoted_object',
      recommendations: 'recommendations',
      rf_prediction_id: 'rf_prediction_id',
      rtb_flag: 'rtb_flag',
      start_time: 'start_time',
      status: 'status',
      targeting: 'targeting',
      updated_time: 'updated_time',
      use_new_app_click: 'use_new_app_click',
      daily_imps: 'daily_imps',
      execution_options: 'execution_options',
      redownload: 'redownload'
    })
  }

  static get BillingEvent () {
    return Object.freeze({
      app_installs: 'APP_INSTALLS',
      clicks: 'CLICKS',
      impressions: 'IMPRESSIONS',
      link_clicks: 'LINK_CLICKS',
      offer_claims: 'OFFER_CLAIMS',
      page_likes: 'PAGE_LIKES',
      post_engagement: 'POST_ENGAGEMENT',
      video_views: 'VIDEO_VIEWS'
    })
  }

  static get ConfiguredStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      archived: 'ARCHIVED'
    })
  }

  static get EffectiveStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      pending_review: 'PENDING_REVIEW',
      disapproved: 'DISAPPROVED',
      preapproved: 'PREAPPROVED',
      pending_billing_info: 'PENDING_BILLING_INFO',
      campaign_paused: 'CAMPAIGN_PAUSED',
      archived: 'ARCHIVED',
      adset_paused: 'ADSET_PAUSED'
    })
  }

  static get OptimizationGoal () {
    return Object.freeze({
      none: 'NONE',
      app_installs: 'APP_INSTALLS',
      brand_awareness: 'BRAND_AWARENESS',
      clicks: 'CLICKS',
      engaged_users: 'ENGAGED_USERS',
      external: 'EXTERNAL',
      event_responses: 'EVENT_RESPONSES',
      impressions: 'IMPRESSIONS',
      lead_generation: 'LEAD_GENERATION',
      link_clicks: 'LINK_CLICKS',
      offer_claims: 'OFFER_CLAIMS',
      offsite_conversions: 'OFFSITE_CONVERSIONS',
      page_engagement: 'PAGE_ENGAGEMENT',
      page_likes: 'PAGE_LIKES',
      post_engagement: 'POST_ENGAGEMENT',
      reach: 'REACH',
      social_impressions: 'SOCIAL_IMPRESSIONS',
      video_views: 'VIDEO_VIEWS'
    })
  }

  static get Status () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      archived: 'ARCHIVED'
    })
  }

  static get DatePreset () {
    return Object.freeze({
      today: 'today',
      yesterday: 'yesterday',
      last_3_days: 'last_3_days',
      this_week: 'this_week',
      last_week: 'last_week',
      last_7_days: 'last_7_days',
      last_14_days: 'last_14_days',
      last_28_days: 'last_28_days',
      last_30_days: 'last_30_days',
      last_90_days: 'last_90_days',
      this_month: 'this_month',
      last_month: 'last_month',
      this_quarter: 'this_quarter',
      last_3_months: 'last_3_months',
      lifetime: 'lifetime'
    })
  }

  static get ExecutionOptions () {
    return Object.freeze({
      validate_only: 'VALIDATE_ONLY',
      synchronous_ad_review: 'SYNCHRONOUS_AD_REVIEW',
      include_recommendations: 'INCLUDE_RECOMMENDATIONS'
    })
  }

  static get Operator () {
    return Object.freeze({
      all: 'ALL',
      any: 'ANY'
    })
  }

  static getEndpoint () {
    return 'adsets'
  }

  getAds (fields, params, fetchFirstPage) {
    return this.getEdge(Ad, fields, params, fetchFirstPage)
  }

  getInsights (fields, params, fetchFirstPage) {
    return this.getEdge(Insights, fields, params, fetchFirstPage)
  }
}

/**
 * Campaign
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group}
 */
class Campaign extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      adlabels: 'adlabels',
      buying_type: 'buying_type',
      can_use_spend_cap: 'can_use_spend_cap',
      configured_status: 'configured_status',
      created_time: 'created_time',
      effective_status: 'effective_status',
      id: 'id',
      name: 'name',
      objective: 'objective',
      recommendations: 'recommendations',
      spend_cap: 'spend_cap',
      start_time: 'start_time',
      status: 'status',
      stop_time: 'stop_time',
      updated_time: 'updated_time',
      execution_options: 'execution_options',
      promoted_object: 'promoted_object'
    })
  }

  static get ConfiguredStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      archived: 'ARCHIVED'
    })
  }

  static get EffectiveStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      pending_review: 'PENDING_REVIEW',
      disapproved: 'DISAPPROVED',
      preapproved: 'PREAPPROVED',
      pending_billing_info: 'PENDING_BILLING_INFO',
      campaign_paused: 'CAMPAIGN_PAUSED',
      archived: 'ARCHIVED',
      adset_paused: 'ADSET_PAUSED'
    })
  }

  static get Status () {
    return Object.freeze({
      active: 'ACTIVE',
      paused: 'PAUSED',
      deleted: 'DELETED',
      archived: 'ARCHIVED'
    })
  }

  static get DatePreset () {
    return Object.freeze({
      today: 'today',
      yesterday: 'yesterday',
      last_3_days: 'last_3_days',
      this_week: 'this_week',
      last_week: 'last_week',
      last_7_days: 'last_7_days',
      last_14_days: 'last_14_days',
      last_28_days: 'last_28_days',
      last_30_days: 'last_30_days',
      last_90_days: 'last_90_days',
      this_month: 'this_month',
      last_month: 'last_month',
      this_quarter: 'this_quarter',
      last_3_months: 'last_3_months',
      lifetime: 'lifetime'
    })
  }

  static get DeleteStrategy () {
    return Object.freeze({
      delete_any: 'DELETE_ANY',
      delete_oldest: 'DELETE_OLDEST',
      delete_archived_before: 'DELETE_ARCHIVED_BEFORE'
    })
  }

  static get ExecutionOptions () {
    return Object.freeze({
      validate_only: 'VALIDATE_ONLY',
      synchronous_ad_review: 'SYNCHRONOUS_AD_REVIEW',
      include_recommendations: 'INCLUDE_RECOMMENDATIONS'
    })
  }

  static get Objective () {
    return Object.freeze({
      brand_awareness: 'BRAND_AWARENESS',
      canvas_app_engagement: 'CANVAS_APP_ENGAGEMENT',
      canvas_app_installs: 'CANVAS_APP_INSTALLS',
      conversions: 'CONVERSIONS',
      event_responses: 'EVENT_RESPONSES',
      external: 'EXTERNAL',
      lead_generation: 'LEAD_GENERATION',
      link_clicks: 'LINK_CLICKS',
      local_awareness: 'LOCAL_AWARENESS',
      mobile_app_engagement: 'MOBILE_APP_ENGAGEMENT',
      mobile_app_installs: 'MOBILE_APP_INSTALLS',
      offer_claims: 'OFFER_CLAIMS',
      page_likes: 'PAGE_LIKES',
      post_engagement: 'POST_ENGAGEMENT',
      product_catalog_sales: 'PRODUCT_CATALOG_SALES',
      video_views: 'VIDEO_VIEWS'
    })
  }

  static get Operator () {
    return Object.freeze({
      all: 'ALL',
      any: 'ANY'
    })
  }

  static getEndpoint () {
    return 'campaigns'
  }

  getAds (fields, params, fetchFirstPage) {
    return this.getEdge(Ad, fields, params, fetchFirstPage)
  }

  getAdSets (fields, params, fetchFirstPage) {
    return this.getEdge(AdSet, fields, params, fetchFirstPage)
  }

  getInsights (fields, params, fetchFirstPage) {
    return this.getEdge(Insights, fields, params, fetchFirstPage)
  }
}

/**
 * Product Item
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/product-item}
 */
class ProductItem extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      additional_image_urls: 'additional_image_urls',
      age_group: 'age_group',
      applinks: 'applinks',
      availability: 'availability',
      brand: 'brand',
      category: 'category',
      color: 'color',
      commerce_insights: 'commerce_insights',
      condition: 'condition',
      custom_data: 'custom_data',
      custom_label_0: 'custom_label_0',
      custom_label_1: 'custom_label_1',
      custom_label_2: 'custom_label_2',
      custom_label_3: 'custom_label_3',
      custom_label_4: 'custom_label_4',
      description: 'description',
      expiration_date: 'expiration_date',
      gender: 'gender',
      gtin: 'gtin',
      id: 'id',
      image_url: 'image_url',
      manufacturer_part_number: 'manufacturer_part_number',
      material: 'material',
      name: 'name',
      ordering_index: 'ordering_index',
      pattern: 'pattern',
      price: 'price',
      product_feed: 'product_feed',
      product_type: 'product_type',
      retailer_id: 'retailer_id',
      retailer_product_group_id: 'retailer_product_group_id',
      review_rejection_reasons: 'review_rejection_reasons',
      review_status: 'review_status',
      sale_price: 'sale_price',
      sale_price_end_date: 'sale_price_end_date',
      sale_price_start_date: 'sale_price_start_date',
      shipping_weight_unit: 'shipping_weight_unit',
      shipping_weight_value: 'shipping_weight_value',
      size: 'size',
      start_date: 'start_date',
      url: 'url',
      visibility: 'visibility',
      android_app_name: 'android_app_name',
      android_class: 'android_class',
      android_package: 'android_package',
      android_url: 'android_url',
      checkout_url: 'checkout_url',
      currency: 'currency',
      inventory: 'inventory',
      ios_app_name: 'ios_app_name',
      ios_app_store_id: 'ios_app_store_id',
      ios_url: 'ios_url',
      ipad_app_name: 'ipad_app_name',
      ipad_app_store_id: 'ipad_app_store_id',
      ipad_url: 'ipad_url',
      iphone_app_name: 'iphone_app_name',
      iphone_app_store_id: 'iphone_app_store_id',
      iphone_url: 'iphone_url',
      windows_phone_app_id: 'windows_phone_app_id',
      windows_phone_app_name: 'windows_phone_app_name',
      windows_phone_url: 'windows_phone_url'
    })
  }

  static getEndpoint () {
    return 'products'
  }

  getProductSets (fields, params, fetchFirstPage) {
    return this.getEdge(ProductSet, fields, params, fetchFirstPage)
  }
}

/**
 * Product Set
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/product-set}
 */
class ProductSet extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      filter: 'filter',
      id: 'id',
      name: 'name',
      product_catalog: 'product_catalog',
      product_count: 'product_count'
    })
  }

  static getEndpoint () {
    return 'product_sets'
  }

  getProducts (fields, params, fetchFirstPage) {
    return this.getEdge(ProductItem, fields, params, fetchFirstPage)
  }
}

/**
 * Product Catalog
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/product-catalog/product-catalog}
 */
class ProductCatalog extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      business: 'business',
      feed_count: 'feed_count',
      id: 'id',
      name: 'name',
      product_count: 'product_count'
    })
  }

  static getEndpoint () {
    return 'product_catalogs'
  }

  getProductSets (fields, params, fetchFirstPage) {
    return this.getEdge(ProductSet, fields, params, fetchFirstPage)
  }

  getProducts (fields, params, fetchFirstPage) {
    return this.getEdge(ProductItem, fields, params, fetchFirstPage)
  }
}

/**
 * Business
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/business-manager-api}
 */
class Business extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      id: 'id',
      name: 'name',
      payment_account_id: 'payment_account_id',
      primary_page: 'primary_page'
    })
  }

  static getEndpoint () {
    return 'businesses'
  }

  getProductCatalogs (fields, params, fetchFirstPage) {
    return this.getEdge(ProductCatalog, fields, params, fetchFirstPage)
  }
}

/**
 * User
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/graph-api/reference/user}
 */
class User extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      about: 'about',
      admin_notes: 'admin_notes',
      age_range: 'age_range',
      bio: 'bio',
      birthday: 'birthday',
      context: 'context',
      cover: 'cover',
      currency: 'currency',
      devices: 'devices',
      education: 'education',
      email: 'email',
      favorite_athletes: 'favorite_athletes',
      favorite_teams: 'favorite_teams',
      first_name: 'first_name',
      gender: 'gender',
      hometown: 'hometown',
      id: 'id',
      inspirational_people: 'inspirational_people',
      install_type: 'install_type',
      installed: 'installed',
      interested_in: 'interested_in',
      is_shared_login: 'is_shared_login',
      is_verified: 'is_verified',
      labels: 'labels',
      languages: 'languages',
      last_name: 'last_name',
      link: 'link',
      locale: 'locale',
      location: 'location',
      meeting_for: 'meeting_for',
      middle_name: 'middle_name',
      name: 'name',
      name_format: 'name_format',
      payment_pricepoints: 'payment_pricepoints',
      political: 'political',
      public_key: 'public_key',
      quotes: 'quotes',
      relationship_status: 'relationship_status',
      religion: 'religion',
      security_settings: 'security_settings',
      shared_login_upgrade_required_by: 'shared_login_upgrade_required_by',
      significant_other: 'significant_other',
      sports: 'sports',
      test_group: 'test_group',
      third_party_id: 'third_party_id',
      timezone: 'timezone',
      token_for_business: 'token_for_business',
      updated_time: 'updated_time',
      verified: 'verified',
      video_upload_limits: 'video_upload_limits',
      viewer_can_send_gift: 'viewer_can_send_gift',
      website: 'website',
      work: 'work'
    })
  }

  getAdAccounts (fields, params, fetchFirstPage) {
    return this.getEdge(AdAccount, fields, params, fetchFirstPage)
  }

  getBusinesses (fields, params, fetchFirstPage) {
    return this.getEdge(Business, fields, params, fetchFirstPage)
  }
}

/**
 * AdAccount
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-account}
 */
class AdAccount extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_groups: 'account_groups',
      account_id: 'account_id',
      account_status: 'account_status',
      age: 'age',
      agency_client_declaration: 'agency_client_declaration',
      amount_spent: 'amount_spent',
      balance: 'balance',
      business: 'business',
      business_city: 'business_city',
      business_country_code: 'business_country_code',
      business_name: 'business_name',
      business_state: 'business_state',
      business_street: 'business_street',
      business_street2: 'business_street2',
      business_zip: 'business_zip',
      can_create_brand_lift_study: 'can_create_brand_lift_study',
      capabilities: 'capabilities',
      created_time: 'created_time',
      currency: 'currency',
      disable_reason: 'disable_reason',
      end_advertiser: 'end_advertiser',
      end_advertiser_name: 'end_advertiser_name',
      failed_delivery_checks: 'failed_delivery_checks',
      funding_source: 'funding_source',
      funding_source_details: 'funding_source_details',
      has_migrated_permissions: 'has_migrated_permissions',
      id: 'id',
      io_number: 'io_number',
      is_notifications_enabled: 'is_notifications_enabled',
      is_personal: 'is_personal',
      is_prepay_account: 'is_prepay_account',
      is_tax_id_required: 'is_tax_id_required',
      last_used_time: 'last_used_time',
      line_numbers: 'line_numbers',
      media_agency: 'media_agency',
      min_campaign_group_spend_cap: 'min_campaign_group_spend_cap',
      min_daily_budget: 'min_daily_budget',
      name: 'name',
      offsite_pixels_tos_accepted: 'offsite_pixels_tos_accepted',
      owner: 'owner',
      owner_business: 'owner_business',
      partner: 'partner',
      rf_spec: 'rf_spec',
      spend_cap: 'spend_cap',
      tax_id: 'tax_id',
      tax_id_status: 'tax_id_status',
      tax_id_type: 'tax_id_type',
      timezone_id: 'timezone_id',
      timezone_name: 'timezone_name',
      timezone_offset_hours_utc: 'timezone_offset_hours_utc',
      tos_accepted: 'tos_accepted',
      user_role: 'user_role'
    })
  }

  static get AccessType () {
    return Object.freeze({
      owner: 'OWNER',
      agency: 'AGENCY'
    })
  }

  static get PermittedRoles () {
    return Object.freeze({
      admin: 'ADMIN',
      general_user: 'GENERAL_USER',
      reports_only: 'REPORTS_ONLY',
      instagram_advertiser: 'INSTAGRAM_ADVERTISER',
      instagram_manager: 'INSTAGRAM_MANAGER',
      fb_employee_dso_advertiser: 'FB_EMPLOYEE_DSO_ADVERTISER'
    })
  }

  static getEndpoint () {
    return 'adaccounts'
  }

  getAdCreatives (fields, params, fetchFirstPage) {
    return this.getEdge(AdCreative, fields, params, fetchFirstPage)
  }

  getAds (fields, params, fetchFirstPage) {
    return this.getEdge(Ad, fields, params, fetchFirstPage)
  }

  getAdSets (fields, params, fetchFirstPage) {
    return this.getEdge(AdSet, fields, params, fetchFirstPage)
  }

  getCampaigns (fields, params, fetchFirstPage) {
    return this.getEdge(Campaign, fields, params, fetchFirstPage)
  }

  getGeneratePreviews (fields, params, fetchFirstPage) {
    return this.getEdge(AdPreview, fields, params, fetchFirstPage, 'generatepreviews')
  }

  getInsights (fields, params, fetchFirstPage) {
    return this.getEdge(Insights, fields, params, fetchFirstPage)
  }

  getUsers (fields, params, fetchFirstPage) {
    return this.getEdge(User, fields, params, fetchFirstPage)
  }

}

export { FacebookAdsApi, AdAccount, AdCreative, AdPreview, AdSet, Ad, Business, Campaign, Insights, ProductCatalog, ProductItem, ProductSet, User };
//# sourceMappingURL=es6.js.map
