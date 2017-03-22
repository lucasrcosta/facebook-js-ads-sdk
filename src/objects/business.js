import { AbstractCrudObject } from './../core'
import ProductCatalog from './product-catalog'

/**
 * Business
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/business-manager-api}
 */
export default class Business extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      created_by: 'created_by',
      created_time: 'created_time',
      id: 'id',
      link: 'link',
      name: 'name',
      payment_account_id: 'payment_account_id',
      primary_page: 'primary_page',
      timezone_id: 'timezone_id',
      two_factor_type: 'two_factor_type',
      updated_by: 'updated_by',
      updated_time: 'updated_time'
    })
  }

  static getEndpoint () {
    return 'businesses'
  }

  getProductCatalogs (fields, params, fetchFirstPage) {
    return this.getEdge(ProductCatalog, fields, params, fetchFirstPage)
  }
}
