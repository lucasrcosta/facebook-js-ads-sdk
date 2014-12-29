if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('XmlHttpRequest', function() {
  'use strict';

  var XmlHttpRequest = FacebookAdsApi.http.XmlHttpRequest;

  describe('constructor', function() {

    it('exists', function() {
      XmlHttpRequest.should.be.a('function');
    });

  });

});
