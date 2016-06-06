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
      id: 'id',
      name: 'name',
      payment_account_id: 'payment_account_id',
      primary_page: 'primary_page'
    })
  }

  static getEndpoint () {
    return 'businesses'
  }

  getProductCatalogs (fields, params, fetchFirstPage) {
    return this.getEdge(ProductCatalog, fields, params, fetchFirstPage)
  }
}
