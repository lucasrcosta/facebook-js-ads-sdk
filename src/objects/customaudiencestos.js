import { AbstractCrudObject } from './../core'

export default class CustomAudiencesTOS extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      content: 'content',
      id: 'id',
      type: 'type'
    })
  }

}
