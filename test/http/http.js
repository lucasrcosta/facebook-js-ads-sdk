if (typeof require === 'function') {
  var Http = require('./../../src/http/http.js');
  require('chai').should();
} else {
  var Http = FbApiAssets.http.Http;
}

describe('Http', function() {
  'use strict';

  describe('constructor', function() {

    it('can be instantiated', function() {
      (new Http()).should.be.an('object');
    });

  });

});
