import { AbstractObject } from './../core'

export default class CustomAudienceSession extends AbstractObject {

  static get Field () {
    return Object.freeze({
      end_time: 'end_time',
      num_invalid_entries: 'num_invalid_entries',
      num_matched: 'num_matched',
      num_received: 'num_received',
      progress: 'progress',
      session_id: 'session_id',
      stage: 'stage',
      start_time: 'start_time'
    })
  }

}
