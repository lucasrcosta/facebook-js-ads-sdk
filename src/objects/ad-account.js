(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['./crud-object', './mixins/cannot-create', './mixins/cannot-delete'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./crud-object'),
      require('./mixins/cannot-create'),
      require('./mixins/cannot-delete')
    );
  } else {
    root.FbApiAssets.Objects.AdAccount = factory(
      root.FbApiAssets.CoreObjects.CrudObject,
      root.FbApiAssets.Mixins.CannotCreate,
      root.FbApiAssets.Mixins.CannotDelete
    );
  }
}(this, function(CrudObject, CannotCreate, CannotDelete) {
  'use strict';

  var endpoint = 'adaccounts';
  var fields = [
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
    'id',
    'is_personal',
    'media_agency',
    'name',
    'offsite_pixels_tos_accepted',
    'partner',
    'spend_cap',
    'timezone_id',
    'timezone_name',
    'timezone_offset_hours_utc',
    'tos_accepted',
    'users',
    'tax_id_status'
  ];

  /**
   * Account object for managing ads
   * @see {@link} https://developers.facebook.com/docs/reference/ads-api/adcampaign
   * @param {FacebookAdsApi} api
   * @param {mixed} [initData]
   * @param {int} [parentId]
   * @extends CrudObject
   * @class
   */
  function AdAccount(api, initData) {
    var _this = new CrudObject(api, endpoint, fields, initData);
    CannotCreate.call(_this);
    CannotDelete.call(_this);

    /**
     * @param  {array} fields
     * @param  {object} params
     * @return {?}
     */
    _this.getAdCampaigns = function(fields, params) {
      var campaigns = _this.getManyByConnection(api.AdCampaign, fields, params);
      // make adgroups objects
      return campaigns;
    };

    return _this;
  }

  AdAccount.getEndpoint = function() { return endpoint; };
  AdAccount.getFields = function() { return fields; };

  return AdAccount;
}));
