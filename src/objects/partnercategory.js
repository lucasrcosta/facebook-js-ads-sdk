import { AbstractCrudObject } from './../core'

export default class PartnerCategory extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      approximate_count: 'approximate_count',
      country: 'country',
      description: 'description',
      details: 'details',
      id: 'id',
      is_private: 'is_private',
      name: 'name',
      parent_category: 'parent_category',
      source: 'source',
      status: 'status',
      targeting_type: 'targeting_type'
    })
  }

  static get PrivateOrPublic () {
    return Object.freeze({
      private: 'PRIVATE',
      public: 'PUBLIC'
    })
  }

  static getEndpoint () {
    return 'partnercategories'
  }

}
