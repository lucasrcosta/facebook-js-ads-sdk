import { AbstractCrudObject } from './../core'

export default class AdAsyncRequest extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      async_request_set: 'async_request_set',
      created_time: 'created_time',
      id: 'id',
      input: 'input',
      result: 'result',
      scope_object_id: 'scope_object_id',
      status: 'status',
      updated_time: 'updated_time'
    })
  }

  static get Status () {
    return Object.freeze({
      canceled: 'CANCELED',
      canceled_dependency: 'CANCELED_DEPENDENCY',
      error: 'ERROR',
      error_conflicts: 'ERROR_CONFLICTS',
      error_dependency: 'ERROR_DEPENDENCY',
      in_progress: 'IN_PROGRESS',
      initial: 'INITIAL',
      pending_dependency: 'PENDING_DEPENDENCY',
      success: 'SUCCESS'
    })
  }

  static get Statuses () {
    return Object.freeze({
      canceled: 'CANCELED',
      canceled_dependency: 'CANCELED_DEPENDENCY',
      error: 'ERROR',
      error_conflicts: 'ERROR_CONFLICTS',
      error_dependency: 'ERROR_DEPENDENCY',
      in_progress: 'IN_PROGRESS',
      initial: 'INITIAL',
      pending_dependency: 'PENDING_DEPENDENCY',
      success: 'SUCCESS'
    })
  }

}
