describe('AdSet', function() {
  'use strict';

  var campaignId;
  var now = (new Date()).toUTCString();
  var adCampaign = new api.AdCampaign({name: 'SDK TEST AD-SET - ' + now}, testData.accountId);

  before(function(done) {
    adCampaign.create()
      .then(function() {
        campaignId = adCampaign.id;
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

  it('creates', function(done) {
    done();
  //   var now = (new Date()).toUTCString();
  //   var adSet = new api.AdSet({name: 'SDK TEST - ' + now}, testData.accountId);
  //   adSet.create()
  //     .then(function() {
  //       if (adSet.id.should.be.ok)
  //         campaignId = adSet.id;
  //       done();
  //     })
  //     .catch(done);
  });

//   it('reads', function(done) {
//     checkSetId(done);
//     var adSet = new api.AdSet(campaignId);
//     adSet.read()
//       .then(function() {
//         adSet.name.should.be.ok;
//         done();
//       })
//       .catch(done);
//   });

//   it('updates', function(done) {
//     checkSetId(done);
//     var adSet = new api.AdSet(campaignId, testData.accountId);
//     var now = (new Date()).toUTCString();
//     adSet.name = 'SDK TEST [UPDATED] - ' + now;
//     adSet.update()
//       .then(function(data) {
//         data.success.should.be.true;
//         done();
//       })
//       .catch(done);
//   });

//   it('archives', function(done) {
//     checkSetId(done);
//     var adSet = new api.AdSet(campaignId, testData.accountId);
//     adSet.archive()
//       .then(function(data) {
//         data.success.should.be.true;
//         done();
//       })
//       .catch(done);
//   });

//   it('deletes', function(done) {
//     checkSetId(done);
//     var adSet = new api.AdSet(campaignId, testData.accountId);
//     adSet.delete()
//       .then(function(data) {
//         data.success.should.be.true;
//         done();
//       })
//       .catch(done);
//   });

//   it('validates', function(done) {
//     var adSet = new api.AdSet({name: 'SDK TEST'}, testData.accountId);
//     adSet.validate()
//       .then(function(data) {
//         data.success.should.be.true;
//         done();
//       })
//       .catch(done);
//   });

//   function checkSetId(done) {
//     if (!campaignId) {
//       done(new Error('No campaignId'));
//       return;
//     }
//   }

});
