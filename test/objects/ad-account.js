if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  require('chai').should();
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

});
