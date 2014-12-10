if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../..', 'src/api.js'));
  require('chai').should();
}

describe('FacebookAdsApi.DataObject', function() {
  'use strict';

  describe('constructor', function() {
    it('exists', function() {
      FacebookAdsApi.DataObject.should.be.a('function');
    });
  });
});
