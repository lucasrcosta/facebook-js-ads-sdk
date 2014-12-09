var path = require('path');
var expect = require('chai').expect;

var XMLHttRequest = require(path.join(__dirname, '..', 'src/xml-http-request.js'));

describe('XMLHttRequest', function() {
  'use strict';

  describe('constructor', function() {
    it('exists', function() {
      expect(XMLHttRequest).to.be.a('function');
    });
  });
});
