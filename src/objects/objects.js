(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['./ad-account', './ad-campaign'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./ad-account'),
      require('./ad-campaign')
    );
  } else {
    root.FbApiAssets.Objects.Objects = factory(
      root.FbApiAssets.Objects.AdAccount,
      root.FbApiAssets.Objects.AdCampaign
    );
  }
}(this, function(AdAccount, AdCampaign) {
  'use strict';

  return {
    AdAccount: AdAccount,
    AdCampaign: AdCampaign
  };
}));
