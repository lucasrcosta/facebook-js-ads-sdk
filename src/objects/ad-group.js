(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdGroup', dependencies, factory);
}(this, function(CrudObject, Archivable) {
  'use strict';

  var endpoint = 'adgroups';
  var fields = [
    'account_id',
    'adgroup_status',
    'bid_type',
    'bid_info',
    'campaign_id',
    'campaign_group_id',
    'conversion_specs',
    'created_time',
    'creative_ids',
    'adgroup_review_feedback',
    'id',
    'name',
    'targeting',
    'tracking_specs',
    'updated_time',
    'view_tags',
    'creative',
    'social_prefs',
    'failed_delivery_checks',
    'objective',
  ];

  /**
   * Contains the data necessary for an ad, such as creative elements and campaign information.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adgroup
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [parentId]  Account Id
   * @extends CrudObject
   * @class
   */
  function AdGroup(api, initData, parentId) {
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);
    Archivable.call(_this, 'campaign_status');

    return _this;
  }

  AdGroup.getEndpoint = function() { return endpoint; };
  AdGroup.getFields = function() { return fields; };

  return AdGroup;
}));
