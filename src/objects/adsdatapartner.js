import { AbstractCrudObject } from './../core'

export default class AdsDataPartner extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      name: 'name',
      rev_share_policies: 'rev_share_policies'
    })
  }

}
