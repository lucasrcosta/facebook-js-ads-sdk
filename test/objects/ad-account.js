if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('AdAccount', function() {
  'use strict';

  describe('constructor', function() {

    it('exists', function() {
      FacebookAdsApi.AdAccount.should.be.a('function');
    });

  });

});
