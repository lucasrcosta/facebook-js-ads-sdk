import { AbstractCrudObject } from './../core'

export default class Page extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      name: 'name',
      category: 'category',
      access_status: 'access_status',
      access_type: 'access_type',
      permitted_roles: 'permitted_roles'
    })
  }

}
