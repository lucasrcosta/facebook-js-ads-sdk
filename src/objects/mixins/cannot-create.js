(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else {
    root.FbApiAssets.Objects.Mixins.CannotCreate = factory();
  }
}(this, function() {
  'use strict';

  function CannotCreate() {
    this.create = function() {
      throw new Error('Object cannot be created');
    };
  }

  return CannotCreate;
}));
