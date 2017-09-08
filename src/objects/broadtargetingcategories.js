import { AbstractCrudObject } from './../core'

export default class BroadTargetingCategories extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      category_description: 'category_description',
      id: 'id',
      name: 'name',
      parent_category: 'parent_category',
      path: 'path',
      size: 'size',
      source: 'source',
      type: 'type',
      type_name: 'type_name',
      untranslated_name: 'untranslated_name',
      untranslated_parent_name: 'untranslated_parent_name'
    })
  }

  static getEndpoint () {
    return 'broadtargetingcategories'
  }

}
