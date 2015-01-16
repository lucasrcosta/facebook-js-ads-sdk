(function(root, factory) {
  'use strict';
  var dependencies = [];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else {
    root.FbApiAssets.Objects.Mixins.Archivable = factory();
  }
}(this, function() {
  'use strict';

  function Archivable(statusFieldName) {
    var _this = this;

    /**
     * Set object status to ARCHIVED
     * @param {object} params additional params
     * @return {promise} resolves to {object} _this
     */
    this.archive = function(params) {
      params = params || {};
      params[statusFieldName] = 'ARCHIVED';
      return _this.update(params);
    };
  }

  return Archivable;
}));
