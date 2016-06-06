import { AbstractCrudObject } from './../core'
import ProductSet from './product-set'
import ProductItem from './product-item'

/**
 * Product Catalog
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/product-catalog/product-catalog}
 */
export default class ProductCatalog extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      business: 'business',
      feed_count: 'feed_count',
      id: 'id',
      name: 'name',
      product_count: 'product_count'
    })
  }

  static getEndpoint () {
    return 'product_catalogs'
  }

  getProductSets (fields, params, fetchFirstPage) {
    return this.getEdge(ProductSet, fields, params, fetchFirstPage)
  }

  getProducts (fields, params, fetchFirstPage) {
    return this.getEdge(ProductItem, fields, params, fetchFirstPage)
  }
}
