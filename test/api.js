if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api');
  var Objects = require('./../src/objects/objects');
  require('chai').should();
} else {
  var Objects = FbApiAssets.Objects.Objects;
}

describe('Api', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('throws an error if no token is given', function() {
      FacebookAdsApi.should.throw(Error);
    });

    it('throws no error if token is given', function() {
      FacebookAdsApi.bind(FacebookAdsApi, token).should.not.throw(Error);
    });

  });

  describe('facebook objects', function() {

    it('exist in API instance', function() {
      var api = new FacebookAdsApi(token);
      Object.keys(Objects).forEach(function(object) {
        api[object].should.be.a('function');
      });
    });

    it('can get it\'s class name', function() {
      var api = new FacebookAdsApi(token);
      Object.keys(Objects).forEach(function(object) {
        object.should.be.equal(api[object].getClassname());
      });
    });

    it('can get it\'s endpoint', function() {
      var api = new FacebookAdsApi(token);
      Object.keys(Objects).forEach(function(object) {
        api[object].getEndpoint.should.be.a('function');
      });
    });

    it('can get it\'s fields', function() {
      var api = new FacebookAdsApi(token);
      Object.keys(Objects).forEach(function(object) {
        api[object].getFields.should.be.a('function');
      });
    });

    it('are instatiated having the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adAccount = new api.AdAccount();
      adAccount.getApi().should.be.eql(api);
    });

  });

});
