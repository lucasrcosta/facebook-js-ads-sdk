import { AbstractCrudObject } from './../core'

export default class ExternalEventSource extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      external_event_sources: 'external_event_sources',
      id: 'id',
      name: 'name',
      source_type: 'source_type'
    })
  }

  static getEndpoint () {
    return 'external_event_sources'
  }

}
