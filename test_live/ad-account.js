describe('AdAccount', function() {
  'use strict';

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

    it('gets Ad Campaigns', function() {
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdCampaigns()
        .then(function(campaigns) {
          function returnId(campaign) { return campaign.id; }
          console.log(campaigns.map(returnId));
          console.log(campaigns);
          campaigns.nextPage().then(function() {
            console.log(campaigns.map(returnId));
            campaigns.previousPage().then(function() {
              console.log(campaigns.map(returnId));
              campaigns.previousPage().then(function() {
                console.log(campaigns.map(returnId));
              });
            });
          });
        }, function(e) {
          console.log('can get Ad Campaigns', e);
          throw e;
        });
    });

  });

});
