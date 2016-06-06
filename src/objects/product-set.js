import { AbstractCrudObject } from './../core'
import ProductItem from './product-item'

/**
 * Product Set
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/product-set}
 */
export default class ProductSet extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      filter: 'filter',
      id: 'id',
      name: 'name',
      product_catalog: 'product_catalog',
      product_count: 'product_count'
    })
  }

  static getEndpoint () {
    return 'product_sets'
  }

  getProducts (fields, params, fetchFirstPage) {
    return this.getEdge(ProductItem, fields, params, fetchFirstPage)
  }
}
