(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdCreative', dependencies, factory);
}(this, function(CrudObject, Archivable) {
  'use strict';

  var endpoint = 'adcreatives';
  var fields = [
    'id',
    'title',
    'actor_id',
    'actor_name',
    'name',
    'object_id',
    'object_story_id',
    'object_story_spec',
    'product_set_id',
    'body',
    'image_hash',
    'image_file',
    'image_url',
    'image_crops',
    'video_id',
    'actor_image_hash',
    'link_url',
    'object_url',
    'url_tags',
    'preview_url',
    'thumbnail_url',
    'follow_redirect',
    'object_store_url',
    'link_deep_link_url',
    'call_to_action_type',
    'object_type',
  ];

  /**
   * An instance of a specific creative which is being used to define the creative field of one or more ad groups.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adcreative
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [parentId]  Account Id
   * @extends CrudObject
   * @class
   */
  function AdCreative(api, initData, parentId) {
    var _this = new CrudObject(api, endpoint, fields, initData, parentId);
    Archivable.call(_this, 'campaign_status');

    return _this;
  }

  AdCreative.getEndpoint = function() { return endpoint; };
  AdCreative.getFields = function() { return fields; };

  return AdCreative;
}));
