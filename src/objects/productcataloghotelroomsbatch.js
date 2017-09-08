import { AbstractCrudObject } from './../core'

export default class ProductCatalogHotelRoomsBatch extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      errors: 'errors',
      errors_total_count: 'errors_total_count',
      file: 'file',
      handle: 'handle',
      password: 'password',
      standard: 'standard',
      status: 'status',
      update_only: 'update_only',
      url: 'url',
      username: 'username'
    })
  }

  static get Standard () {
    return Object.freeze({
      google: 'google'
    })
  }

  static getEndpoint () {
    return 'hotel_rooms_batch'
  }

}
