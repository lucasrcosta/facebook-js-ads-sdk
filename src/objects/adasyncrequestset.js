import { AbstractCrudObject } from './../core'
import AdAsyncRequest from './adasyncrequest'

export default class AdAsyncRequestSet extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      ad_specs: 'ad_specs',
      canceled_count: 'canceled_count',
      created_time: 'created_time',
      error_count: 'error_count',
      id: 'id',
      in_progress_count: 'in_progress_count',
      initial_count: 'initial_count',
      is_completed: 'is_completed',
      name: 'name',
      notification_mode: 'notification_mode',
      notification_result: 'notification_result',
      notification_status: 'notification_status',
      notification_uri: 'notification_uri',
      owner_id: 'owner_id',
      success_count: 'success_count',
      total_count: 'total_count',
      updated_time: 'updated_time'
    })
  }

  static get NotificationMode () {
    return Object.freeze({
      off: 'OFF',
      on_complete: 'ON_COMPLETE'
    })
  }

  static get NotificationStatus () {
    return Object.freeze({
      not_sent: 'NOT_SENT',
      sending: 'SENDING',
      sent: 'SENT'
    })
  }

  static getEndpoint () {
    return 'asyncadrequestsets'
  }

  getRequests (fields, params) {
    return this.getEdge(AdAsyncRequest, fields, params, 'requests')
  }

}
