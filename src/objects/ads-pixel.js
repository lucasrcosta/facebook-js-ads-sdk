import { AbstractCrudObject } from './../core'
import AdAccount from './ad-account'
import CustomAudience from './custom-audience'

/**
 * AdsPixel
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ads-pixel}
 */
export default class AdsPixel extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      code: 'code',
      creation_time: 'creation_time',
      id: 'id',
      is_created_by_business: 'is_created_by_business',
      last_fired_time: 'last_fired_time',
      name: 'name',
      owner_ad_account: 'owner_ad_account',
      owner_business: 'owner_business'
    })
  }

  static getEndpoint () {
    return 'adspixels'
  }

  getAudiences (fields, params, fetchFirstPage) {
    return this.getEdge(CustomAudience, fields, params, fetchFirstPage, 'audiences')
  }

  getSharedAccounts (fields, params, fetchFirstPage) {
    return this.getEdge(AdAccount, fields, params, fetchFirstPage, 'shared_accounts')
  }

}
