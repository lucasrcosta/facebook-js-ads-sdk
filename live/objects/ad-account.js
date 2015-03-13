describe('AdAccount', function() {
  'use strict';

  var adImage;

  before(function(done) {
    if (!FormData)
      throw new Error('FormData missing');
    var formData = new FormData();
    formData.append('1200x628.gif', testImages.gif_1280_628, '1200x628.gif');
    adImage = new api.AdImage(null, testData.accountId);
    adImage.create(formData).then(function() {
      done();
    })
    .catch(done);
  });

  after(function(done) {
    adImage.delete()
      .then(function(data) {
        done();
      })
      .catch(done);
  });

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

    it('gets Ad Users', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdUsers()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

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

    it('gets Ad Previews', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      var creativeData = {
        name: 'SDK TEST AD-PREVIEW',
        title: 'Title for Ad Creative',
        body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        object_url: 'http://www.facebook.com',
        image_hash: adImage.hash
      };
      adAccount.getAdPreviews({
        ad_format: 'RIGHT_COLUMN_STANDARD',
        creative: creativeData
      })
        .then(function(data) {
          data[0].body.should.be.ok;
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
      adAccount.getAdGroupStats()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Conversion Pixels', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getConversionPixels()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Connection Objects', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getConnectionObjects()
        .then(function(data) {
          data.should.be.an('array');
          done();
        })
        .catch(done);
    });

    it('gets Reach Estimate', function(done) {
      var adAccount = new api.AdAccount(testData.accountId);
      var targetingSpec = {geo_locations: {countries: ['BR']}};
      adAccount.getReachEstimate({targeting_spec: targetingSpec})
        .then(function(data) {
          data.should.be.an('object');
          done();
        })
        .catch(done);
    });

  });

});
