(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.coreObjects.mixins.CannotUpdate = factory();
  }
}(this, function() {
  'use strict';

  function CannotUpdate() {
    this.update = function() {
      throw new Error('Object cannot be updated');
    };
  }

  return CannotUpdate;
}));
