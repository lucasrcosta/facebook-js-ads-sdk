(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/data-object',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Insights', dependencies, factory);
}(this, function(DataObject) {
  'use strict';

  var endpoint = 'insights';
  var fields = [
    'account_id',
    'account_name',
    'action_values',
    'actions',
    'actions_per_impression',
    'adgroup_id',
    'adgroup_name',
    'async_percent_completion',
    'async_status',
    'call_to_action_clicks',
    'campaign_end',
    'campaign_group_end',
    'campaign_group_id',
    'campaign_group_name',
    'campaign_id',
    'campaign_name',
    'campaign_start',
    'clicks',
    'cost_per_action_type',
    'cost_per_result',
    'cost_per_total_action',
    'cost_per_unique_click',
    'cpc',
    'cpm',
    'cpp',
    'ctr',
    'date_start',
    'date_stop',
    'frequency',
    'id',
    'impressions',
    'objective',
    'reach',
    'relevance_score',
    'report_run_id',
    'result_rate',
    'results',
    'roas',
    'social_clicks',
    'social_impressions',
    'social_reach',
    'spend',
    'today_spend',
    'total_action_value',
    'total_actions',
    'total_unique_actions',
    'unique_clicks',
    'unique_ctr',
    'unique_social_clicks',
    'video_avg_pct_watched_actions',
    'video_avg_sec_watched_actions',
    'video_complete_watched_actions',
    'video_p100_watched_actions',
    'video_p25_watched_actions',
    'video_p50_watched_actions',
    'video_p75_watched_actions',
    'video_p95_watched_actions',
    'video_start_actions',
];

  /**
   * Insights
   * @see {@link}         https://developers.facebook.com/docs/marketing-api/insights
   * @param {FacebookAdsApi}  api
   * @param {mixed}       initData
   * @extends DataObject
   * @class
   */
  function Insights(api, initData) {
    var _this = new DataObject(Object.keys(initData), initData);

    return _this;
  }

  Insights.getEndpoint = function() { return endpoint; };
  Insights.getFields = function() { return fields; };

  return Insights;
}));
