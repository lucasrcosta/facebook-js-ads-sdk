(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Mixins.CanUpload', dependencies, factory);
}(this, function() {
  'use strict';

  function CanUpload() {
    var _this = this;
    this.upload = function(data) {
      var path = _this.getParentId() + '/' + _this.getEndpoint();
      return new Promise(function(resolve, reject) {
        api.graph.upload(path, data)
          .then(function(data) {
            resolve(data);
          })
          .catch(reject);
      });
    };
  }

  return CanUpload;
}));
