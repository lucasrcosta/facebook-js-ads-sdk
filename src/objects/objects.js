(function(root, factory) {
  'use strict';
  var dependencies = [
    './ad-account',
    './ad-campaign'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Objects', dependencies, factory);
}(this, function(AdAccount, AdCampaign) {
  'use strict';

  return {
    AdAccount: AdAccount,
    AdCampaign: AdCampaign
  };
}));
