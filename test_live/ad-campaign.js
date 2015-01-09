if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api.js');
  var testData = require('./test-data.js');
  require('chai').should();
} else {
  var testData = FbApiAssets.tests.testData;
}

describe('AdCampaign', function() {
  'use strict';

  it('reads', function(done) {
    var api = FacebookAdsApi(testData.token, 'pt_BR');
    var adCampaign = new api.AdCampaign(testData.campaign_id);
    adCampaign.read()
      .then(function() {
        console.log('read ad campaign', adCampaign.getData());
        done();
      })
      .catch(function(err) { done(err); });
  });
});
