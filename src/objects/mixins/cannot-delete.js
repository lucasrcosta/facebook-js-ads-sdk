(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.mixins.CannotDelete = factory();
  }
}(this, function() {
  'use strict';

  function CannotDelete() {
    this.delete = function() {
      throw new Error('Object cannot be deleted');
    };
  }

  return CannotDelete;
}));
