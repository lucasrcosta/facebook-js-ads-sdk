describe('AdGroup', function() {
  'use strict';

  var adCampaign;
  var setId;
  var groupId;
  var now = (new Date()).toUTCString();
  var groupData = {};

  // before(function(done) {
  //   adCampaign = new api.AdCampaign({
  //     name: 'SDK TEST AD-GROUP CAMPAIGN - ' + now
  //   }, testData.accountId);
  //   adCampaign.create().then(function() {
  //     var setData = {
  //       bid_info:{'IMPRESSIONS':50},
  //       bid_type:'ABSOLUTE_OCPM',
  //       campaign_status:'PAUSED',
  //       campaign_group_id: adCampaign.id,
  //       daily_budget:100,
  //       name:'SDK TEST AD-SET',
  //       start_time:1424363064,
  //       targeting:{'geo_locations':{'countries':['BR']}},
  //     };
  //     var adSet = new api.AdSet(setData, testData.accountId);
  //     adSet.create().then(function() {
  //       groupData.campaign_id = setId;
  //       done();
  //     });
  //   })
  //   .catch(done);
  // });
  groupData.campaign_id = 6019705918994;
  // after(function(done) {
  //   adCampaign.delete()
  //     .then(function(data) {
  //       done();
  //     })
  //     .catch(done);
  // });

  it('creates', function(done) {
    var adGroup = new api.AdGroup(groupData, testData.accountId);
    adGroup.create().then(function() {
      if (adGroup.id.should.be.ok)
        groupId = adGroup.id;
      done();
    })
    .catch(done);
  });

  // it('reads', function(done) {
  //   checkGroupId(done);
  //   var adGroup = new api.AdGroup(groupId);
  //   adGroup.read()
  //     .then(function() {
  //       adGroup.name.should.be.ok;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('updates', function(done) {
  //   checkGroupId(done);
  //   var adGroup = new api.AdGroup(groupId, testData.accountId);
  //   var now = (new Date()).toUTCString();
  //   adGroup.name = 'SDK TEST [UPDATED] - ' + now;
  //   adGroup.update()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('archives', function(done) {
  //   checkGroupId(done);
  //   var adGroup = new api.AdGroup(groupId, testData.accountId);
  //   adGroup.archive()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('deletes', function(done) {
  //   checkGroupId(done);
  //   var adGroup = new api.AdGroup(groupId, testData.accountId);
  //   adGroup.delete()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  // function checkGroupId(done) {
  //   if (!GroupId) {
  //     done(new Error('No GroupId'));
  //     return;
  //   }
  // }

});
