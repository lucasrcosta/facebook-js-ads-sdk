import { AbstractObject } from './../core'

export default class RateCard extends AbstractObject {

  static get Field () {
    return Object.freeze({
      country: 'country',
      currency: 'currency',
      rate: 'rate'
    })
  }

  static getEndpoint () {
    return 'ratecard'
  }

}
