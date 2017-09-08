import { AbstractObject } from './../core'

export default class CustomAudiencePrefillState extends AbstractObject {

  static get Field () {
    return Object.freeze({
      description: 'description',
      num_added: 'num_added',
      status: 'status'
    })
  }

}
