(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/data-object',
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.ReachEstimate', dependencies, factory);
}(this, function(DataObject) {
  'use strict';

  var endpoint = 'reachestimate';
  var fields = [
    'users',
    'bid_estimations',
    'estimate_ready',
  ];

  /**
   * The Reach Estimate of a given targeting spec is an approximation of the number of individuals this targeting addresses and what bids should be made to address that target group.
   * @see {@link}         https://developers.facebook.com/docs/marketing-api/reachestimate
   * @param {FacebookAdsApi}  api
   * @param {mixed}       initData
   * @extends DataObject
   * @class
   */
  function ReachEstimate(api, initData) {
    initData = initData.data ? initData.data : initData;
    var _this = new DataObject(Object.keys(initData), initData);

    /**
     * @param {object} newData
     * @param {boolean} persist
     * @return _this
     */
    var parentSetData = _this.setData;
    _this.setData = function(newData, persist) {
      console.log('thinggy', newData.data ? newData.data : newData);
      return parentSetData(newData.data ? newData.data : newData, persist);
    };

    return _this;
  }

  ReachEstimate.getEndpoint = function() { return endpoint; };
  ReachEstimate.getFields = function() { return fields; };

  return ReachEstimate;
}));
