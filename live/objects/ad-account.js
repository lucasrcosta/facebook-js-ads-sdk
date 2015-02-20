describe('AdAccount', function() {
  'use strict';

  it('reads', function(done) {
    var adAccount = new api.AdAccount(testData.accountId);
    adAccount.read()
      .then(function() {
        adAccount.getData().name.should.be.ok;
        done();
      })
      .catch(done);
  });

  describe('connection objects', function() {

    it('gets Ad Campaigns', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdCampaigns()
        .then(function(campaigns) {
          campaigns.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Sets', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdSets()
        .then(function(sets) {
          sets.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Statistics', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdStatistics()
        .then(function(stats) {
          stats.should.be.an('object');
          done();
        })
        .catch(done);
    });

  });

});
