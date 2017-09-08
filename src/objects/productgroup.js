import { AbstractCrudObject } from './../core'
import ProductItem from './productitem'
import ProductSet from './productset'

export default class ProductGroup extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      product_catalog: 'product_catalog',
      retailer_id: 'retailer_id',
      variants: 'variants'
    })
  }

  static getEndpoint () {
    return 'product_groups'
  }

  getProductSets (fields, params) {
    return this.getEdge(ProductSet, fields, params, 'product_sets')
  }

  getProducts (fields, params) {
    return this.getEdge(ProductItem, fields, params, 'products')
  }

}
