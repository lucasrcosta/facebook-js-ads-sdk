if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var ObjectValidation = require(srcPath + 'objects/mixins/object-validation');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var ObjectValidation = FacebookAdsApi.Objects.Mixins.ObjectValidation;
}

describe('AdSet', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdSet.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adSet = new api.AdSet();
      adSet.getApi().should.be.eql(api);
    });

  });

  describe('mixin', function() {

    it('ObjectValidation', sinon.test(function() {
      var objectValidationCall = this.stub(ObjectValidation, 'call');
      var api = new FacebookAdsApi(token);
      new api.AdSet();
      objectValidationCall.should.have.been.called;
    }));

  });

});
