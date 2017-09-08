import { AbstractCrudObject } from './../core'

export default class BusinessAdAccountRequest extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      ad_account: 'ad_account',
      id: 'id'
    })
  }

}
