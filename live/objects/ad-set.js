describe('AdSet', function() {
  'use strict';

  var adCampaign;
  var campaignId;
  var setId;
  var now = (new Date()).toUTCString();
  var setData = {
    bid_info:{'IMPRESSIONS':50},
    bid_type:'ABSOLUTE_OCPM',
    campaign_status:'PAUSED',
    daily_budget:100,
    name:'SDK TEST AD-SET',
    start_time:1424363064,
    targeting:{'geo_locations':{'countries':['BR']}},
  };

  before(function(done) {
    adCampaign = new api.AdCampaign({
      name: 'SDK TEST AD-SET CAMPAIGN - ' + now
    }, testData.accountId);
    adCampaign.create().then(function() {
      setData.campaign_group_id = adCampaign.id;
      done();
    })
    .catch(done);
  });

  after(function(done) {
    adCampaign.delete()
      .then(function(data) {
        done();
      })
      .catch(done);
  });

  it('validates', function(done) {
    var adSet = new api.AdSet(setData, testData.accountId);
    adSet.validate()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('creates', function(done) {
    var adSet = new api.AdSet(setData, testData.accountId);
    adSet.create().then(function() {
      if (adSet.id.should.be.ok)
        setId = adSet.id;
      done();
    })
    .catch(done);
  });

  it('reads', function(done) {
    checkSetId(done);
    var adSet = new api.AdSet(setId);
    adSet.read()
      .then(function() {
        adSet.name.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates', function(done) {
    checkSetId(done);
    var adSet = new api.AdSet(setId, testData.accountId);
    var now = (new Date()).toUTCString();
    adSet.name = 'SDK TEST [UPDATED] - ' + now;
    adSet.update()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('archives', function(done) {
    checkSetId(done);
    var adSet = new api.AdSet(setId, testData.accountId);
    adSet.archive()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('deletes', function(done) {
    checkSetId(done);
    var adSet = new api.AdSet(setId, testData.accountId);
    adSet.delete()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  function checkSetId(done) {
    if (!setId) {
      done(new Error('No setId'));
      return;
    }
  }

});
