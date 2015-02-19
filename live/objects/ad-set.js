describe('AdSet', function() {
  'use strict';

  var adCampaign;
  // var campaignId;
  var campaignId = 6019531903594; // temp
  var setId;
  var now = (new Date()).toUTCString();

  // before(function(done) {
  //   adCampaign = new api.AdCampaign({
  //     name: 'SDK TEST AD-SET CAMPAIGN - ' + now
  //   }, testData.accountId);
  //   adCampaign.create().then(function() {
  //     campaignId = adCampaign.id;
  //     done();
  //   })
  //   .catch(done);
  // });

  // after(function(done) {
  //   adCampaign.delete()
  //     .then(function(data) {
  //       done();
  //     })
  //     .catch(done);
  // });

  it('creates', function(done) {
    var adSet = new api.AdSet({
      bid_info:{'IMPRESSIONS':50},
      bid_type:'ABSOLUTE_OCPM',
      campaign_group_id: campaignId,
      campaign_status:'PAUSED',
      daily_budget:100,
      name:'SDK TEST AD-SET',
      start_time:1424363064,
      targeting:{'geo_locations':{'countries':['BR']}},
    }, testData.accountId);
    adSet.create().then(function() {
      if (adSet.id.should.be.ok)
        setId = adSet.id;
      done();
    })
    .catch(done);
  });

  // it('reads', function(done) {
  //   checkCampaignId(done);
  //   var adCampaign = new api.AdCampaign(campaignId);
  //   adCampaign.read()
  //     .then(function() {
  //       adCampaign.name.should.be.ok;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('updates', function(done) {
  //   checkCampaignId(done);
  //   var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
  //   var now = (new Date()).toUTCString();
  //   adCampaign.name = 'SDK TEST [UPDATED] - ' + now;
  //   adCampaign.update()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('archives', function(done) {
  //   checkCampaignId(done);
  //   var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
  //   adCampaign.archive()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('deletes', function(done) {
  //   checkCampaignId(done);
  //   var adCampaign = new api.AdCampaign(campaignId, testData.accountId);
  //   adCampaign.delete()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('validates', function(done) {
  //   var adCampaign = new api.AdCampaign({name: 'SDK TEST'}, testData.accountId);
  //   adCampaign.validate()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // function checkCampaignId(done) {
  //   if (!campaignId) {
  //     done(new Error('No campaignId'));
  //     return;
  //   }
  // }

});
