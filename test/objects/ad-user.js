if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var CannotCreate = require(srcPath + 'objects/mixins/cannot-create');
  var CannotUpdate = require(srcPath + 'objects/mixins/cannot-update');
  var CannotDelete = require(srcPath + 'objects/mixins/cannot-delete');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CannotCreate = FacebookAdsApi.Objects.Mixins.CannotCreate;
  var CannotUpdate = FacebookAdsApi.Objects.Mixins.CannotUpdate;
  var CannotDelete = FacebookAdsApi.Objects.Mixins.CannotDelete;
}

describe('AdUser', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('mixin', function() {

    it('CannotCreate', sinon.test(function() {
      var cannotCreateCall = this.stub(CannotCreate, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdUser();
      cannotCreateCall.should.have.been.called;
    }));

    it('CannotUpdate', sinon.test(function() {
      var cannotUpdateCall = this.stub(CannotUpdate, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdUser();
      cannotUpdateCall.should.have.been.called;
    }));

    it('CannotDelete', sinon.test(function() {
      var cannotDeleteCall = this.stub(CannotDelete, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdUser();
      cannotDeleteCall.should.have.been.called;
    }));

  });

});
