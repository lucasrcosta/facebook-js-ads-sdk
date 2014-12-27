(function(root) {
  'use strict';

  /**
   * Crud Object
   * Basic Facebook Object properties operations
   * @class
   */
  function CrudObject() {
    var _this = {};

    return _this;
  }

  // Module
  if (typeof module !== 'undefined') module.exports = CrudObject;
  else root.FacebookAdsApi.CrudObject = CrudObject;
})(this);
