if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var chai = require('chai');
  chai.should();
}

describe('AdGroup', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists in API instance', function() {
      var api = new FacebookAdsApi(token);
      api.AdGroup.should.be.a('function');
    });

    it('holds the API instance', function() {
      var api = new FacebookAdsApi(token);
      var adGroup = new api.AdGroup();
      adGroup.getApi().should.be.eql(api);
    });

  });

});
