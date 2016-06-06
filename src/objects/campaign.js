import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdSet from './ad-set'
import Insights from './insights'

/**
 * Campaign
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group}
 */
export default class Campaign extends AbstractCrudObject {
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
