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
    var _this = dataToObjects(ObjClass, response.data);
    Cursor.call(_this, ObjClass, response.paging);

    _this.setCollection = function(data) {
      _this.length = 0;
      _this.push.apply(_this, dataToObjects(ObjClass, data));
    };

  /**
   * Turn response data into objects
   * @param  {class} ObjClass
   * @param  {array} data
   * @return {array}
   */
  function dataToObjects(ObjClass, data) {
    var objArray = [];
    for (var i = 0; i < data.length; i++) {
      objArray.push(new ObjClass(data[i]));
    }
    return objArray;
  }

    return _this;
  }

  return CrudCollection;
}));
