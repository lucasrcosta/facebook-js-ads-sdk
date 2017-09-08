import { AbstractCrudObject } from './../core'

export default class AdPlacePageSet extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      id: 'id',
      location_types: 'location_types',
      name: 'name',
      pages_count: 'pages_count',
      parent_page: 'parent_page'
    })
  }

  static get LocationTypes () {
    return Object.freeze({
      home: 'home',
      recent: 'recent'
    })
  }

  static getEndpoint () {
    return 'ad_place_page_sets'
  }

}
