describe('AdConversionPixel', function() {
  'use strict';

  var pixelId;
  var now = (new Date()).toUTCString();
  var pixelData = {
    name: 'SDK TEST - ' + now,
    tag: 'LEAD',
  };

  it('creates', function(done) {
    var adConversionPixel = new api.AdConversionPixel(pixelData, testData.accountId);
    adConversionPixel.create()
      .then(function() {
        if (adConversionPixel.id.should.be.ok)
          pixelId = adConversionPixel.id;
        done();
      })
      .catch(done);
  });

  it('reads', function(done) {
    checkPixelId(done);
    var adConversionPixel = new api.AdConversionPixel(pixelId);
    adConversionPixel.read()
      .then(function() {
        adConversionPixel.name.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates', function(done) {
    checkPixelId(done);
    var adConversionPixel = new api.AdConversionPixel(pixelId, testData.accountId);
    var now = (new Date()).toUTCString();
    adConversionPixel.name = 'SDK TEST [UPDATED] - ' + now;
    adConversionPixel.update()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  it('deletes', function(done) {
    checkPixelId(done);
    var adConversionPixel = new api.AdConversionPixel(pixelId, testData.accountId);
    adConversionPixel.delete()
      .then(function(data) {
        data.success.should.be.true;
        done();
      })
      .catch(done);
  });

  function checkPixelId(done) {
    if (!pixelId) {
      done(new Error('No pixelId'));
      return;
    }
  }

});
