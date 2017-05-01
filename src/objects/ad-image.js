import { AbstractCrudObject } from './../core'

/**
 * AdImage
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-image}
 */
export default class AdImage extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      created_time: 'created_time',
      creatives: 'creatives',
      hash: 'hash',
      height: 'height',
      id: 'id',
      is_associated_creatives_in_adgroups: 'is_associated_creatives_in_adgroups',
      name: 'name',
      original_height: 'original_height',
      original_width: 'original_width',
      permalink_url: 'permalink_url',
      status: 'status',
      updated_time: 'updated_time',
      url: 'url',
      url_128: 'url_128',
      width: 'width',
      bytes: 'bytes',
      copy_from: 'copy_from',
      zipbytes: 'zipbytes',
      filename: 'filename'
    })
  }

  static get Status () {
    return Object.freeze({
      active: 'ACTIVE',
      deleted: 'DELETED'
    })
  }

  static getEndpoint () {
    return 'adimages'
  }
}
