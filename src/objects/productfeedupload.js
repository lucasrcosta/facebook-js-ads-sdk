import { AbstractCrudObject } from './../core'
import ProductFeedUploadError from './productfeeduploaderror'

export default class ProductFeedUpload extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      end_time: 'end_time',
      id: 'id',
      input_method: 'input_method',
      start_time: 'start_time',
      url: 'url'
    })
  }

  static get InputMethod () {
    return Object.freeze({
      manual_upload: 'Manual Upload',
      server_fetch: 'Server Fetch'
    })
  }

  static getEndpoint () {
    return 'uploads'
  }

  getErrors (fields, params) {
    return this.getEdge(ProductFeedUploadError, fields, params, 'errors')
  }

}
