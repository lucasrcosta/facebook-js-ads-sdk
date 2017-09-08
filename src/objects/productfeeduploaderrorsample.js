import { AbstractCrudObject } from './../core'

export default class ProductFeedUploadErrorSample extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      id: 'id',
      retailer_id: 'retailer_id',
      row_number: 'row_number'
    })
  }

}
