if (typeof require === 'function') {
  var FacebookAdsApi = require('./../src/api.js');
  require('chai').should();
}

describe('Api', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('throws an error if no token is given', function() {
      FacebookAdsApi.should.throw(Error);
    });

    it('throws no error if token is given', function() {
      FacebookAdsApi.bind(FacebookAdsApi, token).should.not.throw(Error);
    });

  });

});
