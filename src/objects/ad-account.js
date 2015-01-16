(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/cannot-create',
    './mixins/cannot-delete',
    './core/collection'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else {
    root.FbApiAssets.Objects.AdAccount = factory(
      root.FbApiAssets.Objects.Core.CrudObject,
      root.FbApiAssets.Objects.Mixins.CannotCreate,
      root.FbApiAssets.Objects.Mixins.CannotDelete,
      root.FbApiAssets.Objects.Core.Collection
    );
  }
}(this, function(CrudObject, CannotCreate, CannotDelete, Collection) {
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
      return new Promise(function(resolve, reject) {
        _this.getManyByConnection(api.AdCampaign, fields, params)
          .then(function(campaigns) {
            // campaigns.forEach(function(campaign) {
              // if (campaign.adgroups) {
                // campaign.adgroups = new Collection(api.AdGroup, campaign.adgroups);
              // }
            // });
            resolve(campaigns);
          })
          .catch(reject);
      });
    };

    return _this;
  }

  AdAccount.getEndpoint = function() { return endpoint; };
  AdAccount.getFields = function() { return fields; };

  return AdAccount;
}));
