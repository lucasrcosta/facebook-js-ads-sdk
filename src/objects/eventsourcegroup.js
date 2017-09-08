import { AbstractCrudObject } from './../core'

export default class EventSourceGroup extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      business: 'business',
      event_sources: 'event_sources',
      id: 'id',
      name: 'name'
    })
  }

  static getEndpoint () {
    return 'event_source_groups'
  }

}
