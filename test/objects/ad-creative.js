if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var chai = require('chai');
  chai.should();
}

describe('AdCreative', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdCreative.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adCreative = new api.AdCreative();
      adCreative.getApi().should.be.eql(api);
    });

  });

});
