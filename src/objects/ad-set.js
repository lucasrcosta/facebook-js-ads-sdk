import { AbstractCrudObject } from './../core'
import Ad from './ad'
import Insights from './insights'

/**
 * AdSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-campaign}
 */
export default class AdSet extends AbstractCrudObject {
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
