describe('AdCreative', function() {
  'use strict';

  var creativeId;
  var adImage;
  var now = (new Date()).toUTCString();

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

  it('creates', function(done) {
    var creativeData = {
      name: 'SDK TEST AD-CREATIVE - ' + now,
      title: 'Title for Ad Creative',
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      object_url: 'http://www.facebook.com',
      image_hash: adImage.hash
    };
    var adCreative = new api.AdCreative(creativeData, testData.accountId);
    adCreative.create().then(function() {
      if (adCreative.id.should.be.ok)
        creativeId = adCreative.id;
      done();
    })
    .catch(done);
  });

  it('reads', function(done) {
    checkCreativeId(done);
    var adCreative = new api.AdCreative(creativeId);
    adCreative.read(['name', 'title', 'body', 'object_url', 'image_hash'])
      .then(function() {
        adCreative.name.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates', function(done) {
    checkCreativeId(done);
    var adCreative = new api.AdCreative(creativeId, testData.accountId);
    var now = (new Date()).toUTCString();
    adCreative.name = 'SDK TEST AD-CREATIVE [UPDATED] - ' + now;
    adCreative.update()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('deletes', function(done) {
    checkCreativeId(done);
    var adCreative = new api.AdCreative(creativeId, testData.accountId);
    adCreative.delete()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  describe('connection objects', function() {

    it('gets Ad Preview', function(done) {
      var adCreative = new api.AdCreative(creativeId, testData.accountId);
      adCreative.getAdPreviews({ad_format: 'RIGHT_COLUMN_STANDARD'})
        .then(function(data) {
          data[0].body.should.be.ok;
          done();
        })
        .catch(done);
    });

  });

  function checkCreativeId(done) {
    if (!creativeId) {
      done(new Error('No creativeId'));
      return;
    }
  }

});
