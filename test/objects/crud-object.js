if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  var CrudObject = require('./../../src/objects/crud-object.js');
  var Promise = require('promise');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CrudObject = FbApiAssets.coreObjects.CrudObject;
}

describe('CrudObject', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('throws an error if no endpoint is given', function() {
      CrudObject.bind(CrudObject, {}, null, ['id']).should.throw(Error);
    });

  });

  it('throws an error if it can\'t get the ID', function() {
    var crudObj = new CrudObject({}, 'endpoint', ['id']);
    crudObj.getId.should.throw(Error);
  });

  describe('crud operations', function() {

    describe('read', function() {

      it('reads an object from the graph and stores it\'s data', function(done) {
        var api = new FacebookAdsApi(token);
        var objId = 123;
        var readData = {
          id: objId,
          int: 42,
          object: {a: 1, b: [1, 2, 3]},
          string: 'string'
        };
        sinon.stub(api.graph, 'get').returns(new Promise(function(resolve) { resolve(readData); }));
        var crudObj = new CrudObject(api, 'endpoint', ['id', 'int', 'object', 'string'], objId);
        crudObj.read()
          .then(function(obj) {
            obj.getData().should.be.eql(readData);
            done();
          })
          .catch(done);
      });

      it('uses node path', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id']);
        crudObj.id = 123;
        var graphGet = sinon.stub(api.graph, 'get');
        crudObj.read();
        graphGet.should.have.been.calledWith(crudObj.getNodePath());
      });

      it('can filter fields', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields);
        crudObj.id = 123;
        var graphGet = sinon.stub(api.graph, 'get');
        var filter = ['field1', 'field2'];
        crudObj.read(filter);
        graphGet.should.have.been.calledWith(crudObj.getNodePath(), {fields: filter});
      });

      it('throws an error creating filtering fields that are not from the object', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields);
        crudObj.id = 123;
        var filter = ['field3'];
        crudObj.read.bind(crudObj, filter).should.throw(Error);
      });

      it('uses the default fields if none are given', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields);
        crudObj.id = 123;
        var graphGet = sinon.stub(api.graph, 'get');
        crudObj.read();
        graphGet.should.have.been.calledWith(crudObj.getNodePath(), {fields: fields});
      });

      it('can receive extra params', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields);
        crudObj.id = 123;
        var graphGet = sinon.stub(api.graph, 'get');
        crudObj.read(null, {param: 1});
        graphGet.should.have.been.calledWith(crudObj.getNodePath(), {fields: fields, param: 1});
      });

    });

    it('throws an error creating an object that has an ID', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      crudObj.id = 123;
      crudObj.create.should.throw(Error);
    });

    it('throws an error updating an object that has no ID', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      crudObj.update.should.throw(Error);
    });

  });

});
