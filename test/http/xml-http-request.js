if (typeof require === 'function') {
  if (typeof define === 'function' && define.amd)
    var Http = require('./../src/http/xml-http-request');
  else
    var Http = require('./../../src/http/http');
  require('chai').should();
} else {
  var Http = FbApiAssets.Http.XmlHttpRequest;
}

describe('Http', function() {
  'use strict';

  describe('constructor', function() {

    it('is an object', function() {
      Http.should.be.an('object');
    });

  });

});
