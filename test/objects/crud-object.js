if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  chai.should();
  chai.use(sinonChai);
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

    it('can read', function(done) {
      var api = new FacebookAdsApi(token);
      var objId = 123;
      var readData = {
        id: objId,
        int: 42,
        object: {a: 1, b: [1, 2, 3]},
        string: 'string'
      };
      var request = sinon.stub(api.graph, 'get').returns(new Promise(function(resolve) { resolve(readData); }));
      var crudObj = new CrudObject(api, 'endpoint', ['id', 'string', 'int', 'object'], objId);
      crudObj.read()
        .then(function(data) {
          data.should.be.equal(readData);
          done();
        })
        .catch(function(err) { done(err); });
    });

  });

});
