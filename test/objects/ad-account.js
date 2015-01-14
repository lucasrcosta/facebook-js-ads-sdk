if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var CannotCreate = require(srcPath + 'objects/mixins/cannot-create');
  var CannotDelete = require(srcPath + 'objects/mixins/cannot-delete');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CannotCreate = FbApiAssets.Mixins.CannotCreate;
  var CannotDelete = FbApiAssets.Mixins.CannotDelete;
}

describe('AdAccount', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('mixin', function() {

    it('CannotCreate', sinon.test(function() {
      var cannotCreateCall = this.stub(CannotCreate, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdAccount();
      cannotCreateCall.should.have.been.called;
    }));

    it('CannotDelete', sinon.test(function() {
      var cannotDeleteCall = this.stub(CannotDelete, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdAccount();
      cannotDeleteCall.should.have.been.called;
    }));

  });

});
