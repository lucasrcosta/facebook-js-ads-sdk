(function(root) {
  'use strict';

  var FacebookAdsApi;

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @param {Object} initData
   * @extends DataObject
   * @class
   */
  function AdAccount(initData) {
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
      'business_street2',
      'business_street',
      'business_zip',
      'created_time',
      'end_advertiser',
      'media_agency',
      'partner',
      'capabilities',
      'currency',
      'daily_spend_limit',
      'id',
      'is_personal',
      'name',
      'offsite_pixels_tos_accepted',
      'spend_cap',
      'spend_cap_action',
      'funding_source',
      'funding_source_details',
      'timezone_id',
      'timezone_name',
      'timezone_offset_hours_utc',
      'tos_accepted',
      'users'
    ];
    var _this = new FacebookAdsApi.CrudObject(endpoint, fields, initData);

    return _this;
  }

  // Module
  if (typeof module !== 'undefined') {
    FacebookAdsApi = module.parent.exports;
    module.exports = AdAccount;
  } else {
    root.FacebookAdsApi.AdAccount = AdAccount;
    FacebookAdsApi = root.FacebookAdsApi;
  }
})(this);
