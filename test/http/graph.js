if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('Graph', function() {
  'use strict';

  var api = new FacebookAdsApi('a1b2c3d4e5');

  describe('constructor', function() {

    it('exists', function() {
      FacebookAdsApi.http.Graph.should.be.a('function');
    });

  });

  describe('requests', function() {

    it('gets an endpoints url', function() {
      api.graph.getRequestUrl('endpoint').should.be.a('string');
    });

  });

});
