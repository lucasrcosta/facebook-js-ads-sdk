if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var CannotUpdate = require(srcPath + 'objects/mixins/cannot-update');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CannotUpdate = FacebookAdsApi.Objects.Mixins.CannotUpdate;
}

describe('AdImage', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdImage.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adImage = new api.AdImage();
      adImage.getApi().should.be.eql(api);
    });

  });

  describe('mixin', function() {

    it('CannotUpdate', sinon.test(function() {
      var cannotUpdateCall = this.stub(CannotUpdate, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdImage();
      cannotUpdateCall.should.have.been.called;
    }));

  });

});
