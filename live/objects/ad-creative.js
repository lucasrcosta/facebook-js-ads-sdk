describe('AdCreative', function() {
  'use strict';

  var  creativeId;
  var now = (new Date()).toUTCString();

  it('creates', function(done) {
    var creativeData = {
      name: 'SDK TEST AD-CREATIVE - ' + now,
      title: 'Title for Ad Creative',
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      object_url: 'http://www.facebook.com',
      image_hash: 'dbce3bf6b57da4ec23359019cb14f8af' // flag
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

  function checkCreativeId(done) {
    if (!creativeId) {
      done(new Error('No creativeId'));
      return;
    }
  }

});
