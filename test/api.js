if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api.js');
  var Objects = require('./../src/objects/objects.js');
  require('chai').should();
} else {
  var Objects = FbApiAssets.Objects;
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

    it('have the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adAccount = new api.AdAccount();
      adAccount.getApi().should.be.eql(api);
    });

  });

});
