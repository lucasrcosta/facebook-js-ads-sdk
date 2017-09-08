import { AbstractCrudObject } from './../core'

export default class BusinessPageRequest extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      page: 'page'
    })
  }

}
