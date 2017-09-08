import { AbstractCrudObject } from './../core'

export default class Lead extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      ad_id: 'ad_id',
      ad_name: 'ad_name',
      adset_id: 'adset_id',
      adset_name: 'adset_name',
      campaign_id: 'campaign_id',
      campaign_name: 'campaign_name',
      created_time: 'created_time',
      custom_disclaimer_responses: 'custom_disclaimer_responses',
      field_data: 'field_data',
      form_id: 'form_id',
      id: 'id',
      is_organic: 'is_organic',
      post: 'post',
      retailer_item_id: 'retailer_item_id'
    })
  }

  static getEndpoint () {
    return 'leads'
  }

}
