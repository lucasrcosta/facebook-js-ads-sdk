describe('Api', function() {
  'use strict';

  var adCampaign1;
  var adCampaign2;
  var now = (new Date()).toUTCString();
  var campaignData = {name: 'SDK TEST - ' + now};

  before(function(done) {
    adCampaign1 = new api.AdCampaign(campaignData, testData.accountId);
    adCampaign2 = new api.AdCampaign(campaignData, testData.accountId);
    var promise1 = adCampaign1.create();
    var promise2 = adCampaign2.create();
    Promise.all([promise1, promise2])
      .then(function() {
        done();
      })
      .catch(done);
  });

  after(function(done) {
    var promise1 = adCampaign1.delete();
    var promise2 = adCampaign2.delete();
    Promise.all([promise1, promise2])
      .then(function() {
        done();
      })
      .catch(done);
  });

  it('reads multiple ids', function(done) {
    api.readIds(api.AdCampaign, [adCampaign1.id, adCampaign2.id]).
      then(function(objects) {
        objects[0].name.should.be.eql(adCampaign1.name);
        objects[1].name.should.be.eql(adCampaign2.name);
        done();
      })
      .catch(done);
  });

});
