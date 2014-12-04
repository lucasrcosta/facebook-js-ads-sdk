var path = require('path');
var expect = require('chai').expect;

var FacebookAdsApi = require(path.join(__dirname, '..', 'src/api.js'));

describe('Api', function () {
  'use strict';

  describe("constructor", function() {
    it('exists', function () {
      expect(FacebookAdsApi).to.be.a('function');
    });
  });
});
