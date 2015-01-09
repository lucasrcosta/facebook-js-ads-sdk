(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['crud-object'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./crud-object.js'));
  } else {
    root.FbApiAssets.objects.AdCampaign = factory(root.FbApiAssets.coreObjects.CrudObject);
  }
}(this, function(CrudObject) {
  'use strict';

  /**
   * Group of Ad Sets
   * @see {@link} https://developers.facebook.com/docs/reference/ads-api/adcampaign/
   * @param {FacebookAdsApi} api
   * @param {mixed} [initData]
   * @param {int} [parentId]
   * @extends CrudObject
   * @class
   */
  function AdCampaign(api, initData, parentId) {
    var endpoint = 'adcampaign_groups';
    var fields = [
      'id',
      'account_id',
      'objective',
      'name',
      'adgroups',
      'campaign_group_status',
      'buying_type'
    ];
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);

    return _this;
  }

  return AdCampaign;
}));
