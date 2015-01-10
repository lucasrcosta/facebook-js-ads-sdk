(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.coreObjects.mixins.CannotCreate = factory();
  }
}(this, function() {
  'use strict';

  function CannotCreate() {
    this.create = function() {
      throw new Error('Object cannot be created on the graph');
    };
  }

  return CannotCreate;
}));
