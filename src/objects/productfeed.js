import { AbstractCrudObject } from './../core'
import ProductFeedUpload from './productfeedupload'
import ProductItem from './productitem'

export default class ProductFeed extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      country: 'country',
      created_time: 'created_time',
      default_currency: 'default_currency',
      deletion_enabled: 'deletion_enabled',
      delimiter: 'delimiter',
      encoding: 'encoding',
      file_name: 'file_name',
      id: 'id',
      latest_upload: 'latest_upload',
      name: 'name',
      product_count: 'product_count',
      quoted_fields_mode: 'quoted_fields_mode',
      schedule: 'schedule'
    })
  }

  static get Delimiter () {
    return Object.freeze({
      autodetect: 'AUTODETECT',
      bar: 'BAR',
      comma: 'COMMA',
      semicolon: 'SEMICOLON',
      tab: 'TAB',
      tilde: 'TILDE'
    })
  }

  static get QuotedFieldsMode () {
    return Object.freeze({
      autodetect: 'AUTODETECT',
      off: 'OFF',
      on: 'ON'
    })
  }

  static get Encoding () {
    return Object.freeze({
      autodetect: 'AUTODETECT',
      latin1: 'LATIN1',
      utf16be: 'UTF16BE',
      utf16le: 'UTF16LE',
      utf32be: 'UTF32BE',
      utf32le: 'UTF32LE',
      utf8: 'UTF8'
    })
  }

  static getEndpoint () {
    return 'product_feeds'
  }

  getProducts (fields, params) {
    return this.getEdge(ProductItem, fields, params, 'products')
  }

  getUploads (fields, params) {
    return this.getEdge(ProductFeedUpload, fields, params, 'uploads')
  }

}
