import { AbstractCrudObject } from './../core'
import AdAccount from './adaccount'
import AdsPixelStatsResult from './adspixelstatsresult'
import Business from './business'
import CustomAudience from './customaudience'

export default class AdsPixel extends AbstractCrudObject {

  static get Field () {
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

  getAudiences (fields, params) {
    return this.getEdge(CustomAudience, fields, params, 'audiences')
  }

  getSharedAccounts (fields, params) {
    return this.getEdge(AdAccount, fields, params, 'shared_accounts')
  }

  getSharedAgencies (fields, params) {
    return this.getEdge(Business, fields, params, 'shared_agencies')
  }

  getStats (fields, params) {
    return this.getEdge(AdsPixelStatsResult, fields, params, 'stats')
  }

}
