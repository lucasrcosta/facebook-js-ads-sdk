if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('XmlHttpRequest', function() {
  'use strict';

  describe('constructor', function() {

    it('exists', function() {
      FacebookAdsApi.XmlHttpRequest.should.be.a('function');
    });

  });

});
