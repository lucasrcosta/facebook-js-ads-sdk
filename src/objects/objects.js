(function(root, factory) {
  'use strict';
  var dependencies = [
    './ad-account',
    './ad-campaign'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else {
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
