import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdCreative from './adcreative'
import AdSet from './adset'
import Campaign from './campaign'

export default class AdLabel extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account: 'account',
      created_time: 'created_time',
      id: 'id',
      name: 'name',
      updated_time: 'updated_time'
    })
  }

  static get ExecutionOptions () {
    return Object.freeze({
      validate_only: 'validate_only'
    })
  }

  static getEndpoint () {
    return 'adlabels'
  }

  getAdCreatives (fields, params) {
    return this.getEdge(AdCreative, fields, params, 'adcreatives')
  }

  getAdSets (fields, params) {
    return this.getEdge(AdSet, fields, params, 'adsets')
  }

  getAds (fields, params) {
    return this.getEdge(Ad, fields, params, 'ads')
  }

  getCampaigns (fields, params) {
    return this.getEdge(Campaign, fields, params, 'campaigns')
  }

}
