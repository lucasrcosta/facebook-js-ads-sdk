if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api.js');
  var testData = require('./test-data.js');
  require('chai').should();
} else {
  var testData = FbApiAssets.tests.testData;
}

describe('AdCampaign', function() {
  'use strict';

  // it('reads', readTest);
  // it('creates', createsTest);
  it('validates', validateTest);

  function readTest(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign(testData.campaign_id);
    adCampaign.read()
      .then(function() {
        // console.log('read ad campaign', adCampaign.getData());
        adCampaign.getData().name.should.be.ok;
        done();
      })
      .catch(function(err) { done(err); });
  };

  function createsTest(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign({name: 'sdk\'s test ad campaign'}, testData.account_id);
    adCampaign.create()
      .then(function() {
        // console.log('created ad campaign', adCampaign.getData());
        adCampaign.getData().id.should.be.ok;
        done();
      })
      .catch(function(err) { done(err); });
  };

  function validateTest(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign({name: 'sdk\'s validation test ad campaign'}, testData.account_id);
    adCampaign.validate()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(function(err) { done(err); });
  };

});
