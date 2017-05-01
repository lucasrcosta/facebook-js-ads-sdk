import { AbstractCrudObject } from './../core'
import AdCreative from './ad-creative'
import Insights from './insights'

/**
 * Ad
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/adgroup}
 */
export default class Ad extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
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
      id: 'id',
      last_updated_by_app_id: 'last_updated_by_app_id',
      name: 'name',
      recommendations: 'recommendations',
      status: 'status',
      tracking_specs: 'tracking_specs',
      updated_time: 'updated_time',
      adset_spec: 'adset_spec',
      date_format: 'date_format',
      display_sequence: 'display_sequence',
      execution_options: 'execution_options',
      redownload: 'redownload',
      filename: 'filename'
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
      this_month: 'this_month',
      last_month: 'last_month',
      this_quarter: 'this_quarter',
      lifetime: 'lifetime',
      last_3d: 'last_3d',
      last_7d: 'last_7d',
      last_14d: 'last_14d',
      last_28d: 'last_28d',
      last_30d: 'last_30d',
      last_90d: 'last_90d',
      last_week_mon_sun: 'last_week_mon_sun',
      last_week_sun_sat: 'last_week_sun_sat',
      last_quarter: 'last_quarter',
      last_year: 'last_year',
      this_week_mon_today: 'this_week_mon_today',
      this_week_sun_today: 'this_week_sun_today',
      this_year: 'this_year'
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
