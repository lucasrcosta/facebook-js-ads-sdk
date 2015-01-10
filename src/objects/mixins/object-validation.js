(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FbApiAssets.coreObjects.mixins.ObjectValidation = factory();
  }
}(this, function() {
  'use strict';

  function ObjectValidation() {
    var _this = this;

    /**
     * Validate an object in the graph
     * @param {object} params additional params
     * @return {promise} resolves to {object} _this
     */
    this.validate = function(params) {
      params = params || {};
      params.execution_options = ['validate_only'];
      return _this.save(params);
    };

    /**
     * Resolve validation save promise
     * @param  {object]} data [description]
     * @param  {function} resolve save resolve function
     */
    _this.resolveSave = function(data, resolve) {
      resolve(data);
    };
  }

  return ObjectValidation;
}));
