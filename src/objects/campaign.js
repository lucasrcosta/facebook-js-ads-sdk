import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdReportRun from './adreportrun'
import AdSet from './adset'
import AdsInsights from './adsinsights'

export default class Campaign extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      adlabels: 'adlabels',
      brand_lift_studies: 'brand_lift_studies',
      budget_rebalance_flag: 'budget_rebalance_flag',
      buying_type: 'buying_type',
      can_create_brand_lift_study: 'can_create_brand_lift_study',
      can_use_spend_cap: 'can_use_spend_cap',
      configured_status: 'configured_status',
      created_time: 'created_time',
      effective_status: 'effective_status',
      execution_options: 'execution_options',
      id: 'id',
      name: 'name',
      objective: 'objective',
      promoted_object: 'promoted_object',
      recommendations: 'recommendations',
      spend_cap: 'spend_cap',
      start_time: 'start_time',
      status: 'status',
      stop_time: 'stop_time',
      updated_time: 'updated_time'
    })
  }

  static get ConfiguredStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      archived: 'ARCHIVED',
      deleted: 'DELETED',
      paused: 'PAUSED'
    })
  }

  static get EffectiveStatus () {
    return Object.freeze({
      active: 'ACTIVE',
      adset_paused: 'ADSET_PAUSED',
      archived: 'ARCHIVED',
      campaign_paused: 'CAMPAIGN_PAUSED',
      deleted: 'DELETED',
      disapproved: 'DISAPPROVED',
      paused: 'PAUSED',
      pending_billing_info: 'PENDING_BILLING_INFO',
      pending_review: 'PENDING_REVIEW',
      preapproved: 'PREAPPROVED'
    })
  }

  static get Status () {
    return Object.freeze({
      active: 'ACTIVE',
      archived: 'ARCHIVED',
      deleted: 'DELETED',
      paused: 'PAUSED'
    })
  }

  static get DatePreset () {
    return Object.freeze({
      last_14d: 'last_14d',
      last_28d: 'last_28d',
      last_30d: 'last_30d',
      last_3d: 'last_3d',
      last_7d: 'last_7d',
      last_90d: 'last_90d',
      last_month: 'last_month',
      last_quarter: 'last_quarter',
      last_week_mon_sun: 'last_week_mon_sun',
      last_week_sun_sat: 'last_week_sun_sat',
      last_year: 'last_year',
      lifetime: 'lifetime',
      this_month: 'this_month',
      this_quarter: 'this_quarter',
      this_week_mon_today: 'this_week_mon_today',
      this_week_sun_today: 'this_week_sun_today',
      this_year: 'this_year',
      today: 'today',
      yesterday: 'yesterday'
    })
  }

  static get DeleteStrategy () {
    return Object.freeze({
      delete_any: 'DELETE_ANY',
      delete_archived_before: 'DELETE_ARCHIVED_BEFORE',
      delete_oldest: 'DELETE_OLDEST'
    })
  }

  static get ExecutionOptions () {
    return Object.freeze({
      include_recommendations: 'include_recommendations',
      validate_only: 'validate_only'
    })
  }

  static get Objective () {
    return Object.freeze({
      app_installs: 'APP_INSTALLS',
      brand_awareness: 'BRAND_AWARENESS',
      conversions: 'CONVERSIONS',
      event_responses: 'EVENT_RESPONSES',
      lead_generation: 'LEAD_GENERATION',
      link_clicks: 'LINK_CLICKS',
      local_awareness: 'LOCAL_AWARENESS',
      offer_claims: 'OFFER_CLAIMS',
      page_likes: 'PAGE_LIKES',
      post_engagement: 'POST_ENGAGEMENT',
      product_catalog_sales: 'PRODUCT_CATALOG_SALES',
      reach: 'REACH',
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

  getAdSets (fields, params) {
    return this.getEdge(AdSet, fields, params, 'adsets')
  }

  getAds (fields, params) {
    return this.getEdge(Ad, fields, params, 'ads')
  }

  getInsights (fields, params) {
    return this.getEdge(AdsInsights, fields, params, 'insights')
  }

  getInsightsAsync (fields, params) {
    return this.getEdge(AdReportRun, fields, params, 'insights')
  }

}
