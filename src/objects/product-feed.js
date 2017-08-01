import { AbstractCrudObject } from './../core'

/**
 * Product Feed
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/product-catalog/product_feeds}
 */
export default class ProductFeed extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      id: 'id',
      country: 'country',
      default_currency: 'default_currency',
      deletion_enabled: 'deletion_enabled',
      delimiter: 'delimiter',
      encoding: 'encoding',
      file_name: 'file_name',
      name: 'name',
      quoted_fields_mode: 'quoted_fields_mode',
      rule: 'rule',
      schedule: 'schedule'
    })
  }

  static getEndpoint () {
    return 'product_feeds'
  }
}
