if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api.js');
  var testData = require('./test-data.js');
  require('chai').should();
} else {
  var testData = FbApiAssets.tests.testData;
}

describe('AdAccount', function() {
  'use strict';

  // it('reads', readsTest);

  function readsTest(done) {
    var api = FacebookAdsApi(testData.token);
    var adAccount = new api.AdAccount(testData.account_id);
    adAccount.read()
      .then(function() {
        // console.log('read ad account', adAccount.getData());
        adAccount.getData().name.should.be.ok;
        done();
      })
      .catch(function(err) { done(err); });
  };

});
