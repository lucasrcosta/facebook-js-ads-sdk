import { AbstractCrudObject } from './../core'
import ProductFeedUploadErrorSample from './productfeeduploaderrorsample'

export default class ProductFeedUploadError extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      description: 'description',
      error_type: 'error_type',
      id: 'id',
      severity: 'severity',
      summary: 'summary',
      total_count: 'total_count'
    })
  }

  static get Severity () {
    return Object.freeze({
      fatal: 'fatal',
      warning: 'warning'
    })
  }

  static getEndpoint () {
    return 'errors'
  }

  getSamples (fields, params) {
    return this.getEdge(ProductFeedUploadErrorSample, fields, params, 'samples')
  }

}
