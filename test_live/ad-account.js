if (typeof require === 'function') {
  var testData = require('./test-data');
  require('chai').should();
}

describe('AdAccount', function() {
  'use strict';

  it('reads', function(done) {
    var api = new FacebookAdsApi(getToken());
    var adAccount = new api.AdAccount(testData.accountId);
    adAccount.read()
      .then(function() {
        adAccount.getData().name.should.be.ok;
        done();
      })
      .catch(done);
  });

});
