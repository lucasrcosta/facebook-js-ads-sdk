describe('AdImage', function() {
  'use strict';

  var  images;
  var now = (new Date()).toUTCString();

  it('creates', function(done) {
    if (!FormData)
      throw new Error('AdImage live tests need FormData implementation');
    var formData = new FormData();
    formData.append('1200x628.gif', testImages.gif_1280_628, '1200x628.gif');
    formData.append('1200x900.gif', testImages.gif_1280_900, '1200x900.gif');
    var adImage = new api.AdImage(null, testData.accountId);
    adImage.create(formData).then(function(data) {
      images = data;
      done();
    })
    .catch(done);
  });

  it('reads', function(done) {
    checkImages(done);
    var adImage = new api.AdImage(images[0].hash, testData.accountId);
    adImage.read()
      .then(function() {
        adImage.url.should.be.ok;
        done();
      })
      .catch(done);
  });

  it('gets multiple images', function(done) {
    checkImages(done);
    var adImage = new api.AdImage(null, testData.accountId);
    var hashes = [images[0].hash, images[1].hash];
    adImage.getImages(hashes)
      .then(function(imgCollection) {
        imgCollection[0].url.should.be.eql(images[0].url);
        imgCollection[1].url.should.be.eql(images[1].url);
        done();
      })
      .catch(done);
  });

  // it('deletes', function(done) {
  //   checkImages(done);
  //   var adImage = new api.AdImage(imageHash, testData.accountId);
  //   adImage.delete()
  //     .then(function(data) {
  //       data.success.should.be.true;
  //       done();
  //     })
  //     .catch(done);
  // });

  function checkImages(done) {
    if (!images.length) {
      done(new Error('No images'));
      return;
    }
  }

});
