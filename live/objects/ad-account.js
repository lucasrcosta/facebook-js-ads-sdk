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
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Sets', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdSets()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Groups', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdGroups()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Creatives', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdCreatives()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Images', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdImages()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Ad Statistics', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdStatistics()
        .then(function(data) {
          data.should.be.an('object');
          done();
        })
        .catch(done);
    });

    it('gets Ad Group Statistics', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdGroupsStats()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

  });

});
