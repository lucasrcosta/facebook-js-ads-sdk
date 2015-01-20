if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var CannotCreate = require(srcPath + 'objects/mixins/cannot-create');
  var CannotDelete = require(srcPath + 'objects/mixins/cannot-delete');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CannotCreate = FacebookAdsApi.Objects.Mixins.CannotCreate;
  var CannotDelete = FacebookAdsApi.Objects.Mixins.CannotDelete;
}

describe('AdAccount', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('mixin', function() {

    it('CannotCreate', sinon.test(function() {
      var cannotCreateCall = this.stub(CannotCreate, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdAccount();
      cannotCreateCall.should.have.been.called;
    }));

    it('CannotDelete', sinon.test(function() {
      var cannotDeleteCall = this.stub(CannotDelete, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdAccount();
      cannotDeleteCall.should.have.been.called;
    }));

  });

  // describe('connection objects', function() {
//
    // it('can get Ad Campaigns', function() {
      // var api = new FacebookAdsApi('CAAJQNz9EKa8BADKPRZAVYONxgIoCM3MzGnPBwPI8i9mZChxjAb0Nbf9Ypq4UKO3OtNmGM6jarksLnjLmeHIqewm9qUuJiZCRGWR7kpQ1UfGvwxsFZArYqtP7N1UwIHHLV2yZBTXHA4WzUEgdOTZBFvnNLLI3LWDR7JXTTGtoP2uhTQR5M4EYHtEGrBUVJAb1t9ymyal3OrptkOTHKGxrDIEJTFGQpb3toZD');
      // var adAccount = new api.AdAccount('act_143757035692004');
      // adAccount.getAdCampaigns()
        // .then(function(campaigns) {
          // function returnId(campaign) { return campaign.id; }
          // console.log(campaigns.map(returnId));
          // console.log(campaigns);
          // campaigns.nextPage().then(function() {
          //   console.log(campaigns.map(returnId));
          //   campaigns.previousPage().then(function() {
          //     console.log(campaigns.map(returnId));
          //     campaigns.previousPage().then(function() {
          //       console.log(campaigns.map(returnId));
          //     });
          //   });
          // });
        // }, function(e) {
          // console.log('can get Ad Campaigns', e);
          // throw e;
        // });
    // });

  // });

});
