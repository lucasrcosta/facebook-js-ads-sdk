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
  function CrudObject(initData) {
    var _this = new FacebookAdsApi.DataObject(initData);

    return _this;
  }

  // Module
  if (typeof module !== 'undefined') {
    FacebookAdsApi = module.parent.exports;
    module.exports = CrudObject;
  } else {
    root.FacebookAdsApi.CrudObject = CrudObject;
    FacebookAdsApi = root.FacebookAdsApi;
  }
})(this);
