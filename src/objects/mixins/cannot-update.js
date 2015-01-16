(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FbApiAssets.define('Objects.Mixins.CannotUpdate', dependencies, factory);
}(this, function() {
  'use strict';

  function CannotUpdate() {
    this.update = function() {
      throw new Error('Object cannot be updated');
    };
  }

  return CannotUpdate;
}));
