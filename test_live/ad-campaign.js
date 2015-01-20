describe('AdCampaign', function() {
  'use strict';

  var campaignId;

  it('creates', function(done) {
    var now = (new Date()).toUTCString();
    var adCampaign = new api.AdCampaign({name: 'SDK TEST - ' + now}, testData.accountId);
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

  it('validates', function(done) {
    var adCampaign = new api.AdCampaign({name: 'SDK TEST'}, testData.accountId);
    adCampaign.validate()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  function checkCampaignId(done) {
    if (!campaignId) {
      done(new Error('No campaignId'));
      return;
    }
  }

});
