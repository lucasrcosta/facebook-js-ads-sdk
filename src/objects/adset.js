import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdActivity from './adactivity'
import AdAsyncRequest from './adasyncrequest'
import AdCreative from './adcreative'
import AdReportRun from './adreportrun'
import AdsInsights from './adsinsights'
import TargetingSentenceLine from './targetingsentenceline'

export default class AdSet extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      adlabels: 'adlabels',
      adset_schedule: 'adset_schedule',
      attribution_spec: 'attribution_spec',
      bid_amount: 'bid_amount',
      bid_info: 'bid_info',
      billing_event: 'billing_event',
      budget_remaining: 'budget_remaining',
      campaign: 'campaign',
      campaign_id: 'campaign_id',
      campaign_spec: 'campaign_spec',
      configured_status: 'configured_status',
      created_time: 'created_time',
      creative_sequence: 'creative_sequence',
      daily_budget: 'daily_budget',
      daily_imps: 'daily_imps',
      effective_status: 'effective_status',
      end_time: 'end_time',
      execution_options: 'execution_options',
      frequency_cap: 'frequency_cap',
      frequency_cap_reset_period: 'frequency_cap_reset_period',
      frequency_control_specs: 'frequency_control_specs',
      id: 'id',
      is_autobid: 'is_autobid',
      is_average_price_pacing: 'is_average_price_pacing',
      lifetime_budget: 'lifetime_budget',
      lifetime_frequency_cap: 'lifetime_frequency_cap',
      lifetime_imps: 'lifetime_imps',
      name: 'name',
      optimization_goal: 'optimization_goal',
      pacing_type: 'pacing_type',
      promoted_object: 'promoted_object',
      recommendations: 'recommendations',
      recurring_budget_semantics: 'recurring_budget_semantics',
      redownload: 'redownload',
      rf_prediction_id: 'rf_prediction_id',
      rtb_flag: 'rtb_flag',
      start_time: 'start_time',
      status: 'status',
      targeting: 'targeting',
      time_based_ad_rotation_id_blocks: 'time_based_ad_rotation_id_blocks',
      time_based_ad_rotation_intervals: 'time_based_ad_rotation_intervals',
      updated_time: 'updated_time',
      use_new_app_click: 'use_new_app_click'
    })
  }

  static get BillingEvent () {
    return Object.freeze({
      app_installs: 'APP_INSTALLS',
      clicks: 'CLICKS',
      impressions: 'IMPRESSIONS',
      link_clicks: 'LINK_CLICKS',
      mrc_video_views: 'MRC_VIDEO_VIEWS',
      offer_claims: 'OFFER_CLAIMS',
      page_likes: 'PAGE_LIKES',
      post_engagement: 'POST_ENGAGEMENT',
      video_views: 'VIDEO_VIEWS'
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

  static get OptimizationGoal () {
    return Object.freeze({
      app_downloads: 'APP_DOWNLOADS',
      app_installs: 'APP_INSTALLS',
      brand_awareness: 'BRAND_AWARENESS',
      clicks: 'CLICKS',
      engaged_users: 'ENGAGED_USERS',
      event_responses: 'EVENT_RESPONSES',
      impressions: 'IMPRESSIONS',
      lead_generation: 'LEAD_GENERATION',
      link_clicks: 'LINK_CLICKS',
      none: 'NONE',
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

  static get ExecutionOptions () {
    return Object.freeze({
      include_recommendations: 'include_recommendations',
      validate_only: 'validate_only'
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

  getActivities (fields, params) {
    return this.getEdge(AdActivity, fields, params, 'activities')
  }

  getAdCreatives (fields, params) {
    return this.getEdge(AdCreative, fields, params, 'adcreatives')
  }

  getAds (fields, params) {
    return this.getEdge(Ad, fields, params, 'ads')
  }

  getAsyncAdRequests (fields, params) {
    return this.getEdge(AdAsyncRequest, fields, params, 'asyncadrequests')
  }

  getInsights (fields, params) {
    return this.getEdge(AdsInsights, fields, params, 'insights')
  }

  getInsightsAsync (fields, params) {
    return this.getEdge(AdReportRun, fields, params, 'insights')
  }

  getTargetingSentenceLines (fields, params) {
    return this.getEdge(TargetingSentenceLine, fields, params, 'targetingsentencelines')
  }

}
