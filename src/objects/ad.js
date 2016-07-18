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
