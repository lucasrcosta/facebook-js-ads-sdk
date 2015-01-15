(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['./crud-object', './mixins/object-validation', './mixins/archivable'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./crud-object'),
      require('./mixins/object-validation'),
      require('./mixins/archivable')
    );
  } else {
    root.FbApiAssets.Objects.AdCampaign = factory(
      root.FbApiAssets.CoreObjects.CrudObject,
      root.FbApiAssets.Mixins.ObjectValidation,
      root.FbApiAssets.Mixins.Archivable
    );
  }
}(this, function(CrudObject, ObjectValidation, Archivable) {
  'use strict';

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
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);
    ObjectValidation.call(_this);
    Archivable.call(_this, 'campaign_group_status');

    return _this;
  }

  AdCampaign.getEndpoint = function() { return endpoint; };
  AdCampaign.getFields = function() { return fields; };

  return AdCampaign;
}));
