import { AbstractCrudObject } from './../core'
import AdCreative from './adcreative'
import AdKeywordStats from './adkeywordstats'
import AdPreview from './adpreview'
import AdReportRun from './adreportrun'
import AdsInsights from './adsinsights'
import Lead from './lead'
import TargetingSentenceLine from './targetingsentenceline'

export default class Ad extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      ad_review_feedback: 'ad_review_feedback',
      adlabels: 'adlabels',
      adset: 'adset',
      adset_id: 'adset_id',
      adset_spec: 'adset_spec',
      bid_amount: 'bid_amount',
      bid_info: 'bid_info',
      bid_type: 'bid_type',
      campaign: 'campaign',
      campaign_id: 'campaign_id',
      configured_status: 'configured_status',
      conversion_specs: 'conversion_specs',
      created_time: 'created_time',
      creative: 'creative',
      date_format: 'date_format',
      display_sequence: 'display_sequence',
      effective_status: 'effective_status',
      execution_options: 'execution_options',
      filename: 'filename',
      id: 'id',
      last_updated_by_app_id: 'last_updated_by_app_id',
      name: 'name',
      recommendations: 'recommendations',
      redownload: 'redownload',
      status: 'status',
      tracking_specs: 'tracking_specs',
      updated_time: 'updated_time'
    })
  }

  static get BidType () {
    return Object.freeze({
      absolute_ocpm: 'ABSOLUTE_OCPM',
      cpa: 'CPA',
      cpc: 'CPC',
      cpm: 'CPM',
      multi_premium: 'MULTI_PREMIUM'
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

  static get ExecutionOptions () {
    return Object.freeze({
      include_recommendations: 'include_recommendations',
      synchronous_ad_review: 'synchronous_ad_review',
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
    return 'ads'
  }

  getAdCreatives (fields, params) {
    return this.getEdge(AdCreative, fields, params, 'adcreatives')
  }

  getInsights (fields, params) {
    return this.getEdge(AdsInsights, fields, params, 'insights')
  }

  getInsightsAsync (fields, params) {
    return this.getEdge(AdReportRun, fields, params, 'insights')
  }

  getKeywordStats (fields, params) {
    return this.getEdge(AdKeywordStats, fields, params, 'keywordstats')
  }

  getLeads (fields, params) {
    return this.getEdge(Lead, fields, params, 'leads')
  }

  getPreviews (fields, params) {
    return this.getEdge(AdPreview, fields, params, 'previews')
  }

  getTargetingSentenceLines (fields, params) {
    return this.getEdge(TargetingSentenceLine, fields, params, 'targetingsentencelines')
  }

}
