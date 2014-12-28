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
    var _this = new FacebookAdsApi.CrudObject(initData);

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
