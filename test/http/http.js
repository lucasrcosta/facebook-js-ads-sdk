if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('Http', function() {
  'use strict';

  var Http = FacebookAdsApi.http.Http;

  describe('constructor', function() {

    it('exists', function() {
      Http.should.be.a('function');
    });

  });

});
