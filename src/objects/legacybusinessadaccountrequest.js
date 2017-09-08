import { AbstractCrudObject } from './../core'

export default class LegacyBusinessAdAccountRequest extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      ad_account: 'ad_account',
      id: 'id',
      permitted_roles: 'permitted_roles'
    })
  }

}
