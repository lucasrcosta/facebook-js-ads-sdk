import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdAccount from './adaccount'
import CustomAudiencePrefillState from './customaudienceprefillstate'
import CustomAudienceSession from './customaudiencesession'

export default class CustomAudience extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      approximate_count: 'approximate_count',
      associated_audience_id: 'associated_audience_id',
      claim_objective: 'claim_objective',
      content_type: 'content_type',
      creation_params: 'creation_params',
      data_source: 'data_source',
      dataset_id: 'dataset_id',
      delivery_status: 'delivery_status',
      description: 'description',
      event_source_group: 'event_source_group',
      exclusions: 'exclusions',
      external_event_source: 'external_event_source',
      id: 'id',
      inclusions: 'inclusions',
      is_value_based: 'is_value_based',
      list_of_accounts: 'list_of_accounts',
      lookalike_audience_ids: 'lookalike_audience_ids',
      lookalike_spec: 'lookalike_spec',
      name: 'name',
      operation_status: 'operation_status',
      opt_out_link: 'opt_out_link',
      origin_audience_id: 'origin_audience_id',
      parent_audience_id: 'parent_audience_id',
      permission_for_actions: 'permission_for_actions',
      pixel_id: 'pixel_id',
      prefill: 'prefill',
      product_set_id: 'product_set_id',
      retention_days: 'retention_days',
      rule: 'rule',
      subtype: 'subtype',
      tags: 'tags',
      time_content_updated: 'time_content_updated',
      time_created: 'time_created',
      time_updated: 'time_updated'
    })
  }

  static get ClaimObjective () {
    return Object.freeze({
      home_listing: 'HOME_LISTING',
      product: 'PRODUCT',
      travel: 'TRAVEL'
    })
  }

  static get ContentType () {
    return Object.freeze({
      destination: 'DESTINATION',
      flight: 'FLIGHT',
      home_listing: 'HOME_LISTING',
      hotel: 'HOTEL'
    })
  }

  static get Subtype () {
    return Object.freeze({
      app: 'APP',
      bag_of_accounts: 'BAG_OF_ACCOUNTS',
      claim: 'CLAIM',
      custom: 'CUSTOM',
      data_set: 'DATA_SET',
      engagement: 'ENGAGEMENT',
      lookalike: 'LOOKALIKE',
      managed: 'MANAGED',
      offline_conversion: 'OFFLINE_CONVERSION',
      partner: 'PARTNER',
      study_rule_audience: 'STUDY_RULE_AUDIENCE',
      video: 'VIDEO',
      website: 'WEBSITE'
    })
  }

  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      approximate_count: 'approximate_count',
      data_source: 'data_source',
      delivery_status: 'delivery_status',
      description: 'description',
      external_event_source: 'external_event_source',
      id: 'id',
      is_value_based: 'is_value_based',
      lookalike_audience_ids: 'lookalike_audience_ids',
      lookalike_spec: 'lookalike_spec',
      name: 'name',
      operation_status: 'operation_status',
      opt_out_link: 'opt_out_link',
      permission_for_actions: 'permission_for_actions',
      pixel_id: 'pixel_id',
      retention_days: 'retention_days',
      rule: 'rule',
      subtype: 'subtype',
      time_content_updated: 'time_content_updated',
      time_created: 'time_created',
      time_updated: 'time_updated'
    })
  }

  static getEndpoint () {
    return 'customaudiences'
  }

  getAdAccounts (fields, params) {
    return this.getEdge(AdAccount, fields, params, 'adaccounts')
  }

  getAds (fields, params) {
    return this.getEdge(Ad, fields, params, 'ads')
  }

  getPrefills (fields, params) {
    return this.getEdge(CustomAudiencePrefillState, fields, params, 'prefills')
  }

  getSessions (fields, params) {
    return this.getEdge(CustomAudienceSession, fields, params, 'sessions')
  }

}
