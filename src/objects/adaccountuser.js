import { AbstractCrudObject } from './../core'

export default class AdAccountUser extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      name: 'name',
      permissions: 'permissions',
      role: 'role'
    })
  }

  static getEndpoint () {
    return 'users'
  }

}
