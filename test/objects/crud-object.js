if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('CrudObject', function() {
  'use strict';

  var token = 'a1b2c3d4e5';
  var CrudObject = FacebookAdsApi.objects.CrudObject;

  describe('constructor', function() {

    it('exists', function() {
      CrudObject.should.be.a('function');
    });

  });

  describe('object properties', function() {

    it('contains an API instance', function() {
      var api = new FacebookAdsApi(token);
      var crudObj = new CrudObject(api, 'endpoint', []);
      crudObj.getApi().should.be.eql(api);
    });

    it('stores an endpoint', function() {
      var api = new FacebookAdsApi(token);
      var crudObj = new CrudObject(api, 'endpoint', []);
      crudObj.getEndpoint().should.be.eql('endpoint');
    });

  });

});
