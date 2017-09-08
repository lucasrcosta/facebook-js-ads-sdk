import { AbstractCrudObject } from './../core'

export default class Domain extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      name: 'name',
      url: 'url'
    })
  }

}
