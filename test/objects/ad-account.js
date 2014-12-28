if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('AdAccount', function() {
  'use strict';

  var api = new FacebookAdsApi('a1b2c3d4e5');

  describe('constructor', function() {

    it('exists in API instance', function() {
      api.AdAccount.should.be.a('function');
    });

  });

});
