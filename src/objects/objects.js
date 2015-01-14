(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['./ad-account', './ad-campaign'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./ad-account'),
      require('./ad-campaign')
    );
  }
}(this, function(AdAccount, AdCampaign) {
  'use strict';

  return {
    AdAccount: AdAccount,
    AdCampaign: AdCampaign
  };
}));
