/* jshint ignore:start */
(function(root, factory) {
  'use strict';
  var dependencies = [
    './ad-account',
    './ad-campaign',
    './ad-set',
    './ad-group',
    './ad-creative',
    './ad-image',
    './ad-preview',
    './ad-statistics',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Objects', dependencies, factory);

}(this, function(AdAccount, AdCampaign, AdSet, AdGroup, AdCreative, AdImage, AdPreview, AdStatistics) {
  'use strict';

  return {
    AdAccount: AdAccount,
    AdCampaign: AdCampaign,
    AdSet: AdSet,
    AdGroup: AdGroup,
    AdCreative: AdCreative,
    AdImage: AdImage,
    AdPreview: AdPreview,
    AdStatistics: AdStatistics,
  };
}));
/* jshint ignore:end */
