(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Mixins.CannotDelete', dependencies, factory);
}(this, function() {
  'use strict';

  function CannotDelete() {
    this.delete = function() {
      throw new Error('Object cannot be deleted');
    };
  }

  return CannotDelete;
}));
