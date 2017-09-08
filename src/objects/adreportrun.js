import { AbstractCrudObject } from './../core'
import AdsInsights from './adsinsights'

export default class AdReportRun extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      action_attribution_windows: 'action_attribution_windows',
      action_breakdowns: 'action_breakdowns',
      action_report_time: 'action_report_time',
      async_percent_completion: 'async_percent_completion',
      async_status: 'async_status',
      breakdowns: 'breakdowns',
      date_preset: 'date_preset',
      date_start: 'date_start',
      date_stop: 'date_stop',
      default_summary: 'default_summary',
      emails: 'emails',
      export_columns: 'export_columns',
      export_format: 'export_format',
      export_name: 'export_name',
      fields: 'fields',
      filtering: 'filtering',
      friendly_name: 'friendly_name',
      id: 'id',
      is_bookmarked: 'is_bookmarked',
      is_running: 'is_running',
      level: 'level',
      product_id_limit: 'product_id_limit',
      schedule_id: 'schedule_id',
      sort: 'sort',
      summary: 'summary',
      summary_action_breakdowns: 'summary_action_breakdowns',
      time_completed: 'time_completed',
      time_increment: 'time_increment',
      time_range: 'time_range',
      time_ranges: 'time_ranges',
      time_ref: 'time_ref'
    })
  }

  static getEndpoint () {
    return 'insights'
  }

  getInsights (fields, params) {
    return this.getEdge(AdsInsights, fields, params, 'insights')
  }

}
