if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('CrudObject', function() {
  'use strict';

  describe('constructor', function() {

    it('exists', function() {
      FacebookAdsApi.CrudObject.should.be.a('function');
    });

  });

  describe('object properties', function() {

    it('stores an endpoint', function() {
      var crudObj = new FacebookAdsApi.CrudObject('endpoint', []);
      crudObj.getEndpoint().should.be.eql('endpoint');
    });

    it('makes a fields object', function() {
      var crudObj = new FacebookAdsApi.CrudObject('endpoint', ['a', 'b']);
      crudObj.fields.should.be.eql({a: 'a', b: 'b'});
    });

    it('fields object is frozen', function() {
      (function() {
        var crudObj = new FacebookAdsApi.CrudObject('endpoint', ['a', 'b']);
        crudObj.fields.a = 'c';
      }).should.throw(TypeError);
    });

  });

});
