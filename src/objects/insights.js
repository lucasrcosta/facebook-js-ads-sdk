import { AbstractCrudObject } from './../core'

/**
 * Insights
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ads-insights}
 * @see {@link https://developers.facebook.com/docs/marketing-api/insights-api}
 */
export default class Insights extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_id: 'account_id',
      account_name: 'account_name',
      action_values: 'action_values',
      actions: 'actions',
      ad_id: 'ad_id',
      ad_name: 'ad_name',
      adset_id: 'adset_id',
      adset_name: 'adset_name',
      age: 'age',
      app_store_clicks: 'app_store_clicks',
      buying_type: 'buying_type',
      call_to_action_clicks: 'call_to_action_clicks',
      campaign_id: 'campaign_id',
      campaign_name: 'campaign_name',
      canvas_avg_view_percent: 'canvas_avg_view_percent',
      canvas_avg_view_time: 'canvas_avg_view_time',
      clicks: 'clicks',
      cost_per_10_sec_video_view: 'cost_per_10_sec_video_view',
      cost_per_action_type: 'cost_per_action_type',
      cost_per_estimated_ad_recallers: 'cost_per_estimated_ad_recallers',
      cost_per_inline_link_click: 'cost_per_inline_link_click',
      cost_per_inline_post_engagement: 'cost_per_inline_post_engagement',
      cost_per_total_action: 'cost_per_total_action',
      cost_per_unique_action_type: 'cost_per_unique_action_type',
      cost_per_unique_click: 'cost_per_unique_click',
      cost_per_unique_inline_link_click: 'cost_per_unique_inline_link_click',
      country: 'country',
      cpc: 'cpc',
      cpm: 'cpm',
      cpp: 'cpp',
      ctr: 'ctr',
      date_start: 'date_start',
      date_stop: 'date_stop',
      deeplink_clicks: 'deeplink_clicks',
      estimated_ad_recall_rate: 'estimated_ad_recall_rate',
      estimated_ad_recallers: 'estimated_ad_recallers',
      frequency: 'frequency',
      frequency_value: 'frequency_value',
      gender: 'gender',
      hourly_stats_aggregated_by_advertiser_time_zone: 'hourly_stats_aggregated_by_advertiser_time_zone',
      hourly_stats_aggregated_by_audience_time_zone: 'hourly_stats_aggregated_by_audience_time_zone',
      impression_device: 'impression_device',
      impressions: 'impressions',
      inline_link_click_ctr: 'inline_link_click_ctr',
      inline_link_clicks: 'inline_link_clicks',
      inline_post_engagement: 'inline_post_engagement',
      newsfeed_avg_position: 'newsfeed_avg_position',
      newsfeed_clicks: 'newsfeed_clicks',
      newsfeed_impressions: 'newsfeed_impressions',
      objective: 'objective',
      place_page_id: 'place_page_id',
      place_page_name: 'place_page_name',
      placement: 'placement',
      product_id: 'product_id',
      reach: 'reach',
      region: 'region',
      relevance_score: 'relevance_score',
      social_clicks: 'social_clicks',
      social_impressions: 'social_impressions',
      social_reach: 'social_reach',
      social_spend: 'social_spend',
      spend: 'spend',
      total_action_value: 'total_action_value',
      total_actions: 'total_actions',
      total_unique_actions: 'total_unique_actions',
      unique_actions: 'unique_actions',
      unique_clicks: 'unique_clicks',
      unique_ctr: 'unique_ctr',
      unique_impressions: 'unique_impressions',
      unique_inline_link_click_ctr: 'unique_inline_link_click_ctr',
      unique_inline_link_clicks: 'unique_inline_link_clicks',
      unique_link_clicks_ctr: 'unique_link_clicks_ctr',
      unique_social_clicks: 'unique_social_clicks',
      unique_social_impressions: 'unique_social_impressions',
      video_10_sec_watched_actions: 'video_10_sec_watched_actions',
      video_15_sec_watched_actions: 'video_15_sec_watched_actions',
      video_30_sec_watched_actions: 'video_30_sec_watched_actions',
      video_avg_pct_watched_actions: 'video_avg_pct_watched_actions',
      video_avg_sec_watched_actions: 'video_avg_sec_watched_actions',
      video_complete_watched_actions: 'video_complete_watched_actions',
      video_p100_watched_actions: 'video_p100_watched_actions',
      video_p25_watched_actions: 'video_p25_watched_actions',
      video_p50_watched_actions: 'video_p50_watched_actions',
      video_p75_watched_actions: 'video_p75_watched_actions',
      video_p95_watched_actions: 'video_p95_watched_actions',
      website_clicks: 'website_clicks',
      website_ctr: 'website_ctr'
    })
  }

  static get ActionAttributionWindows () {
    return Object.freeze({
      value_1d_view: '1d_view',
      value_7d_view: '7d_view',
      value_28d_view: '28d_view',
      value_1d_click: '1d_click',
      value_7d_click: '7d_click',
      value_28d_click: '28d_click',
      value_default: 'default'
    })
  }

  static get ActionBreakdowns () {
    return Object.freeze({
      action_carousel_card_id: 'action_carousel_card_id',
      action_carousel_card_name: 'action_carousel_card_name',
      action_destination: 'action_destination',
      action_device: 'action_device',
      action_target_id: 'action_target_id',
      action_type: 'action_type',
      action_video_type: 'action_video_type'
    })
  }

  static get ActionReportTime () {
    return Object.freeze({
      impression: 'impression',
      conversion: 'conversion'
    })
  }

  static get Breakdowns () {
    return Object.freeze({
      age: 'age',
      country: 'country',
      gender: 'gender',
      frequency_value: 'frequency_value',
      hourly_stats_aggregated_by_advertiser_time_zone: 'hourly_stats_aggregated_by_advertiser_time_zone',
      hourly_stats_aggregated_by_audience_time_zone: 'hourly_stats_aggregated_by_audience_time_zone',
      impression_device: 'impression_device',
      place_page_id: 'place_page_id',
      placement: 'placement',
      placement_merge_rhc: 'placement_merge_rhc',
      product_id: 'product_id',
      region: 'region'
    })
  }

  static get DatePreset () {
    return Object.freeze({
      today: 'today',
      yesterday: 'yesterday',
      last_3_days: 'last_3_days',
      this_week: 'this_week',
      last_week: 'last_week',
      last_7_days: 'last_7_days',
      last_14_days: 'last_14_days',
      last_28_days: 'last_28_days',
      last_30_days: 'last_30_days',
      last_90_days: 'last_90_days',
      this_month: 'this_month',
      last_month: 'last_month',
      this_quarter: 'this_quarter',
      last_3_months: 'last_3_months',
      lifetime: 'lifetime'
    })
  }

  static get Level () {
    return Object.freeze({
      ad: 'ad',
      adset: 'adset',
      campaign: 'campaign',
      account: 'account'
    })
  }

  static get SummaryActionBreakdowns () {
    return Object.freeze({
      action_carousel_card_id: 'action_carousel_card_id',
      action_carousel_card_name: 'action_carousel_card_name',
      action_destination: 'action_destination',
      action_device: 'action_device',
      action_target_id: 'action_target_id',
      action_type: 'action_type',
      action_video_type: 'action_video_type'
    })
  }

  static get Summary () {
    return Object.freeze({
      id: 'id',
      account_id: 'account_id',
      async_percent_completion: 'async_percent_completion',
      async_status: 'async_status',
      date_start: 'date_start',
      date_stop: 'date_stop',
      emails: 'emails',
      friendly_name: 'friendly_name',
      is_bookmarked: 'is_bookmarked',
      is_running: 'is_running',
      schedule_id: 'schedule_id',
      time_completed: 'time_completed',
      time_ref: 'time_ref'
    })
  }

  static getEndpoint () {
    return 'insights'
  }
}
