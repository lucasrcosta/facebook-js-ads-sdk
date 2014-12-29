if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('Graph', function() {
  'use strict';

  var Graph = FacebookAdsApi.http.Graph;

  describe('constructor', function() {

    it('exists', function() {
      Graph.should.be.a('function');
    });

  });

});
