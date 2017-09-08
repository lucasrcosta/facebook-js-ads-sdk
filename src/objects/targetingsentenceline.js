import { AbstractCrudObject } from './../core'

export default class TargetingSentenceLine extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      params: 'params',
      targetingsentencelines: 'targetingsentencelines'
    })
  }

  static getEndpoint () {
    return 'targetingsentencelines'
  }

}
