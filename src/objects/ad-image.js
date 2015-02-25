(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/cannot-update'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdImage', dependencies, factory);
}(this, function(CrudObject, CannotUpdate) {
  'use strict';

  var endpoint = 'adimages';
  var fields = [
    'id',
    'hash',
    'url',
    'creatives',
    'filename',
    'width',
    'height',
    'original_width',
    'original_height',
  ];

  /**
   * Images for use in Ad Creatives
   * @see   {@link}           https://developers.facebook.com/docs/marketing-api/adimage
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [parentId]  Account Id
   * @extends CrudObject
   * @class
   */
  function AdImage(api, initData, parentId) {
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);
    CannotUpdate.call(_this);

    /**
     * Create new AdImage(s)
     * @data    {object}
     * @return  {promise} resolves to {object} _this or an array of them
     */
    _this.create = function(data) {
      var path = _this.getParentId() + '/' + _this.getEndpoint();
      return new Promise(function(resolve, reject) {
        api.graph.upload(path, data)
          .then(function(data) {
            var imgData;
            var keys = Object.keys(data.images);
            if (keys.length > 1) {
              var images = [];
              for (var i = keys.length - 1; i >= 0; i--) {
                imgData = data.images[keys[i]];
                imgData.filename = keys[i];
                images.push(api.AdImage(imgData, parentId));
              }
              resolve(images);
            } else {
              imgData = data.images[keys[0]];
              imgData.filename = keys[0];
              resolve(_this.setData(imgData, true));
            }
          })
          .catch(reject);
      });
    };

    return _this;
  }

  AdImage.getEndpoint = function() { return endpoint; };
  AdImage.getFields = function() { return fields; };

  return AdImage;
}));
