import { AbstractCrudObject } from './../core'
import AdAccount from './adaccount'

export default class OffsitePixel extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      creator: 'creator',
      id: 'id',
      js_pixel: 'js_pixel',
      last_firing_time: 'last_firing_time',
      name: 'name',
      tag: 'tag'
    })
  }

  static get Tag () {
    return Object.freeze({
      add_to_cart: 'ADD_TO_CART',
      checkout: 'CHECKOUT',
      key_page_view: 'KEY_PAGE_VIEW',
      lead: 'LEAD',
      other: 'OTHER',
      registration: 'REGISTRATION'
    })
  }

  static getEndpoint () {
    return 'offsitepixels'
  }

  getAdAccounts (fields, params) {
    return this.getEdge(AdAccount, fields, params, 'adaccounts')
  }

}
