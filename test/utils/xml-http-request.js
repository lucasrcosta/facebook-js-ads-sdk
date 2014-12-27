if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('FacebookAdsApi.XMLHttRequest', function() {
  'use strict';

  describe('constructor', function() {

    it('exists', function() {
      FacebookAdsApi.XMLHttRequest.should.be.a('function');
    });

  });

});
