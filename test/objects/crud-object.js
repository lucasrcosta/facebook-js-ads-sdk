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

  it('throws an error if it can\'t get the id', function() {
    var api = new FacebookAdsApi(token);
    var crudObj = new CrudObject(api, 'endpoint', []);
    crudObj.getId.should.throw(Error);
  });

});
