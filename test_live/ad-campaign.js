if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api');
  var testData = require('./test-data');
  require('chai').should();
} else {
  var testData = FacebookAdsApi.tests.testData;
}

describe('AdCampaign', function() {
  'use strict';

  it('creates', function(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign({name: 'sdk\'s test ad campaign'}, testData.account_id);
    adCampaign.create()
      .then(function() {
        adCampaign.id.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('reads', function(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign(testData.campaign_id);
    adCampaign.read()
      .then(function() {
        adCampaign.name.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('validates', function(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign({name: 'sdk\'s validation test ad campaign'}, testData.account_id);
    adCampaign.validate()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('updates', function(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign(testData.campaign_id, testData.account_id);
    var now = new Date();
    adCampaign.name = now;
    adCampaign.update()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('archives', function(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign({name: 'sdk\'s test ad campaign'}, testData.account_id);
    adCampaign.create()
      .then(function() {
        adCampaign.archive()
          .then(function(data) {
            data.success.should.be.true;
            done();
          });
      })
      .catch(done);
  });

  it('deletes', function(done) {
    var api = FacebookAdsApi(testData.token);
    var adCampaign = new api.AdCampaign({name: 'sdk\'s test ad campaign'}, testData.account_id);
    adCampaign.create()
      .then(function() {
        adCampaign.delete()
          .then(function(data) {
            data.success.should.be.true;
            done();
          });
      })
      .catch(done);
  });

});
