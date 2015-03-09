(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/cannot-create',
    './mixins/cannot-delete'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdAccount', dependencies, factory);
}(this, function(CrudObject, CannotCreate, CannotDelete) {
  'use strict';

  var endpoint = 'adaccounts';
  var fields = [
    'id',
    'account_groups',
    'account_id',
    'account_status',
    'age',
    'agency_client_declaration',
    'amount_spent',
    'balance',
    'business_city',
    'business_country_code',
    'business_name',
    'business_state',
    'business_street',
    'business_street2',
    'business_zip',
    'capabilities',
    'created_time',
    'currency',
    'daily_spend_limit',
    'end_advertiser',
    'funding_source',
    'funding_source_details',
    'is_personal',
    'media_agency',
    'name',
    'offsite_pixels_tos_accepted',
    'partner',
    'spend_cap',
    'tax_id_status',
    'timezone_id',
    'timezone_name',
    'timezone_offset_hours_utc',
    'tos_accepted',
    'users',
  ];

  /**
   * Account object for managing ads
   * @see   {@link}           https://developers.facebook.com/docs/reference/ads-api/adcampaign
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @extends CrudObject
   * @class
   */
  function AdAccount(api, initData) {
    var _this = new CrudObject(api, endpoint, fields, initData);
    CannotCreate.call(_this);
    CannotDelete.call(_this);

    /**
     * Overriding for connected object creation
     * @return {string}
     */
    _this.getParentId = _this.getId;

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdCampaigns = function(fields, params) {
      return _this.getManyByConnection(api.AdCampaign, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdSets = function(fields, params) {
      return _this.getManyByConnection(api.AdSet, fields, params);
    };

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
    _this.getAdImages = function(fields, params) {
      return _this.getManyByConnection(api.AdImage, fields, params);
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
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdPreviews = function(params) {
      return _this.getManyByConnection(api.AdPreview, null, params, 'generatepreviews');
    };

    /**
     * @param  {array} adGroupIds
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdGroupStats = function(adGroupIds, params) {
      params = params || {};
      params.adgroup_ids = adGroupIds || [];
      return _this.getManyByConnection(api.AdStatistics, null, params, 'adgroupstats');
    };

    return _this;
  }

  AdAccount.getEndpoint = function() { return endpoint; };
  AdAccount.getFields = function() { return fields; };

  return AdAccount;
}));
