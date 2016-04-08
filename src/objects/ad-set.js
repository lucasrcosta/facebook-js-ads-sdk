(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/object-validation',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdSet', dependencies, factory);
}(this, function(CrudObject, ObjectValidation, Archivable) {
  'use strict';

  var endpoint = 'adcampaigns';
  var fields = [
    'account_id',
    'adlabels',
    'bid_amount',
    'bid_info',
    'billing_event',
    'budget_remaining',
    'campaign_group_id',
    'campaign_schedule',
    'created_time',
    'creative_sequence',
    'daily_budget',
    'end_time',
    'id',
    'is_autobid',
    'lifetime_budget',
    'lifetime_imps',
    'name',
    'optimization_goal',
    'product_ad_behavior',
    'pacing_type',
    'promoted_object',
    'rf_prediction_id',
    'rtb_flag',
    'start_time',
    'campaign_status',
    'targeting',
    'updated_time',
  ];

  /**
   * Group of ads that share the same daily or lifetime budget, schedule, bid type, bid info, and targeting data.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adset
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function AdSet(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    ObjectValidation.call(_this);
    Archivable.call(_this, 'campaign_status');

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdGroups = function(fields, params) {
      return _this.getManyByConnection(api.AdGroup, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdCreatives = function(fields, params) {
      return _this.getManyByConnection(api.AdCreative, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getInsights = function(fields, params) {
      return _this.getOneByConnection(api.Insights, fields, params);
    };

    return _this;
  }

  AdSet.getEndpoint = function() { return endpoint; };
  AdSet.getFields = function() { return fields; };

  return AdSet;
}));
