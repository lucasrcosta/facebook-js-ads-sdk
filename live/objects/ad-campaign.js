describe('AdCampaign', function() {
  'use strict';

  var campaignId;
  var now = (new Date()).toUTCString();
  var campaignData = {name: 'SDK TEST - ' + now};

  it('validates', function(done) {
    var adCampaign = new api.AdCampaign(campaignData, testData.accountId);
    adCampaign.validate()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('creates', function(done) {
    var adCampaign = new api.AdCampaign(campaignData, testData.accountId);
    adCampaign.create()
      .then(function() {
        if (adCampaign.id.should.be.ok)
          campaignId = adCampaign.id;
        done();
      })
      .catch(done);
  });

  it('reads', function(done) {
    checkCampaignId(done);
    var adCampaign = new api.AdCampaign(campaignId);
    adCampaign.read()
      .then(function() {
        adCampaign.name.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates', function(done) {
    checkCampaignId(done);
    var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
    var now = (new Date()).toUTCString();
    adCampaign.name = 'SDK TEST [UPDATED] - ' + now;
    adCampaign.update()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('archives', function(done) {
    checkCampaignId(done);
    var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
    adCampaign.archive()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('deletes', function(done) {
    checkCampaignId(done);
    var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
    adCampaign.delete()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  describe('connection objects', function() {

    it('gets Ad Sets', function(done) {
      checkCampaignId(done);
      var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
      adCampaign.getAdSets()
        .then(function(sets) {
          sets.should.be.an('array');
          done();
        })
        .catch(done);
    });

  });

  function checkCampaignId(done) {
    if (!campaignId) {
      done(new Error('No campaignId'));
      return;
    }
  }

});
