import { AbstractCrudObject } from './../core'

export default class Transaction extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      app_amount: 'app_amount',
      billing_end_time: 'billing_end_time',
      billing_reason: 'billing_reason',
      billing_start_time: 'billing_start_time',
      charge_type: 'charge_type',
      checkout_campaign_group_id: 'checkout_campaign_group_id',
      credential_id: 'credential_id',
      fatura_id: 'fatura_id',
      id: 'id',
      payment_option: 'payment_option',
      product_type: 'product_type',
      provider_amount: 'provider_amount',
      status: 'status',
      time: 'time',
      tracking_id: 'tracking_id'
    })
  }

  static get ProductType () {
    return Object.freeze({
      facebook_ad: 'facebook_ad',
      ig_ad: 'ig_ad'
    })
  }

  static getEndpoint () {
    return 'transactions'
  }

}
