if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  var CannotCreate = require('./../../src/objects/mixins/cannot-create.js');
  var CannotDelete = require('./../../src/objects/mixins/cannot-delete.js');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CannotCreate = FbApiAssets.mixins.CannotCreate;
  var CannotDelete = FbApiAssets.mixins.CannotDelete;
}

describe('AdAccount', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdAccount.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adAccount = new api.AdAccount();
      adAccount.getApi().should.be.eql(api);
    });

  });

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
