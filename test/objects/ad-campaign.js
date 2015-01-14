if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  var ObjectValidation = require('./../../src/objects/mixins/object-validation.js');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var ObjectValidation = FbApiAssets.Mixins.ObjectValidation;
}

describe('AdCampaign', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdCampaign.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adCampaign = new api.AdCampaign();
      adCampaign.getApi().should.be.eql(api);
    });

  });

  describe('mixin', function() {

    it('ObjectValidation', sinon.test(function() {
      var objectValidationCall = this.stub(ObjectValidation, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdCampaign();
      objectValidationCall.should.have.been.called;
    }));

  });

});
