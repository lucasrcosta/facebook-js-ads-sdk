describe('AdGroup', function() {
  'use strict';

  var adCampaign;
  var setId;
  var adImage;
  var adCreative;
  var groupId;
  var now = (new Date()).toUTCString();
  var groupData = {
    name: 'SDK TEST AD-GROUP - ' + now,
  };

  before(function(done) {
    this.timeout(6000);
    var campaignData = {
      name: 'SDK TEST AD-GROUP CAMPAIGN - ' + now
    };

    var setData = {
      bid_info:{'IMPRESSIONS':50},
      bid_type:'ABSOLUTE_OCPM',
      campaign_status:'PAUSED',
      daily_budget:100,
      name:'SDK TEST AD-SET',
      start_time:1424363064,
      targeting: {
        'geo_locations': {'countries': ['BR']}
      },
    };

    var creativeData = {
      name: 'SDK TEST AD-CREATIVE - ' + now,
      title: 'Title for Ad Creative',
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      object_url: 'http://www.facebook.com',
    };

    var adSetPromise = new Promise(function(resolve, reject) {
      // Create Campaign
      adCampaign = new api.AdCampaign(campaignData, testData.accountId);
      adCampaign.create().then(function() {
        setData.campaign_group_id = adCampaign.id;
        // Create AdSet
        var adSet = new api.AdSet(setData, testData.accountId);
        resolve(adSet.create());
      })
      .catch(reject);
    });

    var adCreativePromise = new Promise(function(resolve, reject) {
      // Create AdImage
      if (!FormData)
        throw new Error('FormData missing');
      var formData = new FormData();
      formData.append('1200x628.gif', testImages.gif_1280_628, '1200x628.gif');
      adImage = new api.AdImage(null, testData.accountId);
      adImage.create(formData).then(function() {
        // Create AdCreative
        creativeData.image_hash = adImage.hash;
        adCreative = new api.AdCreative(creativeData, testData.accountId);
        resolve(adCreative.create());
      })
      .catch(reject);
    });

    Promise.all([adSetPromise, adCreativePromise])
      .then(function(data) {
        groupData.campaign_id = data[0].id;
        groupData.creative = {'creative_id': data[1].id};
        done();
      })
      .catch(done);
  });

  after(function(done) {
    this.timeout(6000);
    adCampaign.delete()
      .then(function(data) {
        adCreative.delete()
          .then(function(data) {
            adImage.delete()
              .then(function(data) {
                done();
              });
          });
      })
      .catch(done);
  });

  it('creates', function(done) {
    var adGroup = new api.AdGroup(groupData, testData.accountId);
    adGroup.create().then(function() {
      if (adGroup.id.should.be.ok)
        groupId = adGroup.id;
      done();
    })
    .catch(done);
  });

  it('reads', function(done) {
    checkGroupId(done);
    var adGroup = new api.AdGroup(groupId);
    adGroup.read()
      .then(function() {
        adGroup.name.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates', function(done) {
    checkGroupId(done);
    var adGroup = new api.AdGroup(groupId, testData.accountId);
    var now = (new Date()).toUTCString();
    adGroup.name = 'SDK TEST AD-CREATIVE [UPDATED] - ' + now;
    adGroup.update()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('archives', function(done) {
    checkGroupId(done);
    var adGroup = new api.AdGroup(groupId, testData.accountId);
    adGroup.archive()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('deletes', function(done) {
    checkGroupId(done);
    var adGroup = new api.AdGroup(groupId, testData.accountId);
    adGroup.delete()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  describe('connection objects', function() {

    it('gets Ad Statistics', function(done) {
      var adGroup = new api.AdGroup(groupId, testData.accountId);
      adGroup.getAdStatistics()
        .then(function(data) {
          data.should.be.an('object');
          done();
        })
        .catch(done);
    });

  });

  function checkGroupId(done) {
    if (!groupId) {
      done(new Error('No groupId'));
      return;
    }
  }

});
