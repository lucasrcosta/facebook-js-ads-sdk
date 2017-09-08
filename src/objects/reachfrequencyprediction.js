import { AbstractCrudObject } from './../core'

export default class ReachFrequencyPrediction extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      account_id: 'account_id',
      budget: 'budget',
      campaign_group_id: 'campaign_group_id',
      campaign_id: 'campaign_id',
      campaign_time_start: 'campaign_time_start',
      campaign_time_stop: 'campaign_time_stop',
      curve_budget_reach: 'curve_budget_reach',
      daily_impression_curve: 'daily_impression_curve',
      day_parting_schedule: 'day_parting_schedule',
      destination_id: 'destination_id',
      destination_ids: 'destination_ids',
      end_time: 'end_time',
      expiration_time: 'expiration_time',
      external_budget: 'external_budget',
      external_impression: 'external_impression',
      external_maximum_budget: 'external_maximum_budget',
      external_maximum_impression: 'external_maximum_impression',
      external_maximum_reach: 'external_maximum_reach',
      external_minimum_budget: 'external_minimum_budget',
      external_minimum_impression: 'external_minimum_impression',
      external_minimum_reach: 'external_minimum_reach',
      external_reach: 'external_reach',
      frequency_cap: 'frequency_cap',
      grp_dmas_audience_size: 'grp_dmas_audience_size',
      holdout_percentage: 'holdout_percentage',
      id: 'id',
      instagram_destination_id: 'instagram_destination_id',
      interval_frequency_cap: 'interval_frequency_cap',
      interval_frequency_cap_reset_period: 'interval_frequency_cap_reset_period',
      name: 'name',
      num_curve_points: 'num_curve_points',
      objective: 'objective',
      pause_periods: 'pause_periods',
      placement_breakdown: 'placement_breakdown',
      prediction_mode: 'prediction_mode',
      prediction_progress: 'prediction_progress',
      reach: 'reach',
      reservation_status: 'reservation_status',
      rf_prediction_id_to_share: 'rf_prediction_id_to_share',
      start_time: 'start_time',
      status: 'status',
      stop_time: 'stop_time',
      story_event_type: 'story_event_type',
      target_audience_size: 'target_audience_size',
      target_spec: 'target_spec',
      time_created: 'time_created',
      time_updated: 'time_updated'
    })
  }

  static get Status () {
    return Object.freeze({
      active: 'ACTIVE',
      completed: 'COMPLETED',
      draft: 'DRAFT',
      expired: 'EXPIRED',
      pending: 'PENDING'
    })
  }

  static getEndpoint () {
    return 'reachfrequencypredictions'
  }

}
