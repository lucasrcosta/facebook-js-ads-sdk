if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api');
  var testData = require('./test-data');
  require('chai').should();
}

describe('AdAccount', function() {
  'use strict';

  it('reads', function(done) {
    var api = FacebookAdsApi(getToken());
    var adAccount = new api.AdAccount(testData.accountId);
    adAccount.read()
      .then(function() {
        adAccount.getData().name.should.be.ok;
        done();
      })
      .catch(done);
  });

});
