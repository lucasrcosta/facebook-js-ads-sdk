import { AbstractCrudObject } from './../core'

export default class Hotel extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      address: 'address',
      applinks: 'applinks',
      brand: 'brand',
      description: 'description',
      guest_ratings: 'guest_ratings',
      hotel_id: 'hotel_id',
      id: 'id',
      images: 'images',
      lowest_base_price: 'lowest_base_price',
      name: 'name',
      phone: 'phone',
      star_rating: 'star_rating',
      url: 'url'
    })
  }

  static getEndpoint () {
    return 'hotels'
  }

}
