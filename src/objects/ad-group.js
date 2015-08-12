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
    'adgroup_review_feedback',
    'id',
    'name',
    'targeting',
    'tracking_specs',
    'updated_time',
    'creative',
    'social_prefs',
    'failed_delivery_checks',
  ];

  /**
   * Contains the data necessary for an ad, such as creative elements and campaign information.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adgroup
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function AdGroup(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    Archivable.call(_this, 'campaign_status');

    /**
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdPreviews = function(params) {
      return _this.getManyByConnection(api.AdPreview, null, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdStatistics = function(fields, params) {
      return _this.getOneByConnection(api.AdStatistics, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getReachEstimate = function(fields, params) {
      return _this.getOneByConnection(api.ReachEstimate, fields, params);
    };

    return _this;
  }

  AdGroup.getEndpoint = function() { return endpoint; };
  AdGroup.getFields = function() { return fields; };

  return AdGroup;
}));
