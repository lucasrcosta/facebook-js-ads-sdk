if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
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
    var crudObj = new CrudObject(api, 'endpoint');
    crudObj.getId.should.throw(Error);
  });

  describe('crud operations', function() {

    it('reads an object from the graph and stores it\'s data', function(done) {
      var api = new FacebookAdsApi(token);
      var objId = 123;
      var readData = {
        id: objId,
        int: 42,
        object: {a: 1, b: [1, 2, 3]},
        string: 'string'
      };
      var request = sinon.stub(api.graph, 'get').returns(new Promise(function(resolve) { resolve(readData); }));
      var crudObj = new CrudObject(api, 'endpoint', ['id', 'int', 'object', 'string'], objId);
      crudObj.read()
        .then(function(obj) {
          obj.getData().should.be.eql(readData);
          done();
        })
        .catch(function(err) { done(err); });
    });

  });

});
