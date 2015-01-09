if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  require('chai').should();
}

describe('AdCampaign', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdCampaign.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adAccount = new api.AdCampaign();
      adAccount.getApi().should.be.eql(api);
    });

  });

});
