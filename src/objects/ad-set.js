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
   'bid_type',
   'bid_info',
   'budget_remaining',
   'campaign_group_id',
   'campaign_schedule',
   'campaign_status',
   'created_time',
   'daily_budget',
   'end_time',
   'id',
   'lifetime_budget',
   'name',
   'pacing_type',
   'start_time',
   'rf_prediction_id',
   'updated_time',
   'targeting',
   'promoted_object',
  ];

  /**
   * Group of ads that share the same daily or lifetime budget, schedule, bid type, bid info, and targeting data.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adset/
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [parentId]
   * @extends CrudObject
   * @class
   */
  function AdSet(api, initData, parentId) {
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);
    ObjectValidation.call(_this);
    Archivable.call(_this, 'campaign_group_status');

    return _this;
  }

  AdSet.getEndpoint = function() { return endpoint; };
  AdSet.getFields = function() { return fields; };

  return AdSet;
}));
