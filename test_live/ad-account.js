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

    it('gets Ad Campaigns', function(done) {
      function returnId(campaign) { return campaign.id; }
      this.timeout(10000);
      var adAccount = new api.AdAccount(testData.accountId);
      adAccount.getAdCampaigns()
        .then(function(campaigns) {
          log(campaigns);
          var allCampaigns = [];
          var hasNext = true;
          function getNext() {
            campaigns.nextPage()
              .then(function() {
                allCampaigns = allCampaigns.concat(campaigns.map(returnId));
                if (campaigns.hasNext())
                  getNext();
                else {
                  log(allCampaigns);
                  done();
                }
              })
              .catch(function(e) {
                console.log('can\'t get pagination', e);
                throw e;
              });
          };
          getNext();
        })
        .catch(function(e) {
          console.log('can\'t get Ad Campaigns', e);
          throw e;
        });
    });

  });

});
