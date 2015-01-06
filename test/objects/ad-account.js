if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  var testData = require(path.join(__dirname, '../test-data.js'));
  require('chai').should();
}

describe('AdAccount', function() {
  'use strict';

  var api = new FacebookAdsApi(testData.token);

  describe('constructor', function() {

    it('exists in API instance', function() {
      api.AdAccount.should.be.a('function');
    });

    it('reads an account', function(done) {
      var adAccount = new api.AdAccount();
      adAccount.id = testData.accountId;
      adAccount.read()
        .then(function(data) {
          console.log(data);
          done();
        },
        function(data) {
          console.log(data);
          done();
        });
    });

  });

});
