(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([
      './../utils/utils',
      './mixins/cursor'
    ], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./../utils/utils'),
      require('./mixins/cursor')
    );
  } else {
    root.FbApiAssets.CoreObjects.CrudCollection = factory(
      root.FbApiAssets.Utils.Utils,
      root.FbApiAssets.Mixins.Cursor
    );
  }
}(this, function(Utils, Cursor) {
  'use strict';

  function CrudCollection(ObjClass, response) {
    var _this = Utils.makeOjectsArray(ObjClass, response.data);
    Cursor.call(_this, ObjClass, response.paging);

    _this.setCollection = function(data) {
      _this.length = 0;
      _this.push.apply(_this, Utils.makeOjectsArray(ObjClass, data));
    };

    return _this;
  }

  return CrudCollection;
}));
