import { AbstractCrudObject } from './../core'

/**
 * Ad
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/custom-audience-api}
 */
export default class CustomAudience extends AbstractCrudObject {
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
      time_updated: 'time_updated',
      claim_objective: 'claim_objective',
      content_type: 'content_type',
      dataset_id: 'dataset_id',
      event_source_group: 'event_source_group',
      list_of_accounts: 'list_of_accounts',
      origin_audience_id: 'origin_audience_id',
      prefill: 'prefill',
      product_set_id: 'product_set_id',
      associated_audience_id: 'associated_audience_id',
      creation_params: 'creation_params',
      exclusions: 'exclusions',
      inclusions: 'inclusions',
      parent_audience_id: 'parent_audience_id',
      tags: 'tags'
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
      hotel: 'HOTEL',
      home_listing: 'HOME_LISTING'
    })
  }

  static get Subtype () {
    return Object.freeze({
      custom: 'CUSTOM',
      website: 'WEBSITE',
      app: 'APP',
      offline_conversion: 'OFFLINE_CONVERSION',
      claim: 'CLAIM',
      partner: 'PARTNER',
      managed: 'MANAGED',
      video: 'VIDEO',
      lookalike: 'LOOKALIKE',
      engagement: 'ENGAGEMENT',
      data_set: 'DATA_SET',
      bag_of_accounts: 'BAG_OF_ACCOUNTS',
      study_rule_audience: 'STUDY_RULE_AUDIENCE'
    })
  }

  static getEndpoint () {
    return 'customaudiences'
  }
}
