import { AbstractCrudObject } from './../core'
import ProductGroup from './productgroup'
import ProductItem from './productitem'

export default class ProductSet extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      auto_creation_url: 'auto_creation_url',
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

  getProductGroups (fields, params) {
    return this.getEdge(ProductGroup, fields, params, 'product_groups')
  }

  getProducts (fields, params) {
    return this.getEdge(ProductItem, fields, params, 'products')
  }

}
