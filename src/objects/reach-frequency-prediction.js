import { AbstractCrudObject } from './../core'

/**
 * Reach Frequency Prediction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/reach-frequency-prediction}
 */
export default class ReachFrequencyPrediction extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      id: 'id',
      campaign_group_id: 'campaign_group_id',
      campaign_id: 'campaign_id',
      campaign_time_start: 'campaign_time_start',
      campaign_time_stop: 'campaign_time_stop',
      curve_budget_reach: 'curve_budget_reach',
      daily_impression_curve: 'daily_impression_curve',
      destination_id: 'destination_id',
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
      instagram_destination_id: 'instagram_destination_id',
      interval_frequency_cap: 'interval_frequency_cap',
      interval_frequency_cap_reset_period: 'interval_frequency_cap_reset_period',
      name: 'name',
      pause_periods: 'pause_periods',
      placement_breakdown: 'placement_breakdown',
      prediction_mode: 'prediction_mode',
      prediction_progress: 'prediction_progress',
      reservation_status: 'reservation_status',
      status: 'status',
      story_event_type: 'story_event_type',
      target_audience_size: 'target_audience_size',
      target_spec: 'target_spec',
      time_created: 'time_created',
      time_updated: 'time_updated',
      budget: 'budget',
      day_parting_schedule: 'day_parting_schedule',
      destination_ids: 'destination_ids',
      end_time: 'end_time',
      objective: 'objective',
      rf_prediction_id_to_share: 'rf_prediction_id_to_share',
      start_time: 'start_time',
      stop_time: 'stop_time'
    })
  }

  static get Objective () {
    return Object.freeze({
      brand_awareness: 'BRAND_AWARENESS',
      post_engagement: 'POST_ENGAGEMENT',
      mobile_app_installs: 'MOBILE_APP_INSTALLS',
      link_clicks: 'LINK_CLICKS',
      conversions: 'CONVERSIONS',
      video_views: 'VIDEO_VIEWS'
    })
  }

  static getEndpoint () {
    return 'reachfrequencypredictions'
  }
}
