import { AbstractObject } from './../core'

export default class AdsPixelStatsResult extends AbstractObject {

  static get Field () {
    return Object.freeze({
      aggregation: 'aggregation',
      data: 'data',
      timestamp: 'timestamp'
    })
  }

  static get Aggregation () {
    return Object.freeze({
      browser_type: 'browser_type',
      custom_data_field: 'custom_data_field',
      device_os: 'device_os',
      device_type: 'device_type',
      event: 'event',
      host: 'host',
      pixel_fire: 'pixel_fire',
      url: 'url'
    })
  }

  static getEndpoint () {
    return 'stats'
  }

}
