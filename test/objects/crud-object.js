if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  var CrudObject = require('./../../src/objects/crud-object.js');
  var Promise = require('promise');
  var chai = require('chai');
  var sinon = require('sinon');
  var should = chai.should();
} else {
  var CrudObject = FbApiAssets.CoreObjects.CrudObject;
}

describe('CrudObject', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('throws an error if no endpoint is given', function() {
      CrudObject.bind(CrudObject, {}, null, ['id']).should.throw(Error);
    });

  });

  it('throws an error if it can\'t get the ID when needed', function() {
    var crudObj = new CrudObject({}, 'endpoint', ['id']);
    crudObj.getId.should.throw(Error);
  });

  it('throws an error if it can\'t get the parentId when needed', function() {
    var crudObj = new CrudObject({}, 'endpoint', ['id']);
    crudObj.getParentId.should.throw(Error);
  });

  describe('crud operations', function() {

    describe('read', function() {

      it('uses node path as path', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123);
        var graphGet = sinon.stub(api.graph, 'get');
        crudObj.read();
        graphGet.should.have.been.calledWith(crudObj.getNodePath());
      });

      it('can filter fields', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields, 123);
        var graphGet = sinon.stub(api.graph, 'get');
        var filter = ['field1', 'field2'];
        crudObj.read(filter);
        graphGet.should.have.been.calledWith(crudObj.getNodePath(), {fields: filter});
      });

      it('throws an error creating filtering fields that are not from the object', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields, 123);
        var filter = ['field3'];
        crudObj.read.bind(crudObj, filter).should.throw(Error);
      });

      it('uses the default fields if none are given', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields, 123);
        var graphGet = sinon.stub(api.graph, 'get');
        crudObj.read();
        graphGet.should.have.been.calledWith(crudObj.getNodePath(), {fields: fields});
      });

      it('can receive extra params', function() {
        var api = new FacebookAdsApi(token);
        var fields = ['id', 'field1', 'field2'];
        var crudObj = new CrudObject(api, 'endpoint', fields, 123);
        var graphGet = sinon.stub(api.graph, 'get');
        crudObj.read(null, {param: 1});
        graphGet.should.have.been.calledWith(crudObj.getNodePath(), {fields: fields, param: 1});
      });

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

    });

    describe('create', function() {

      it('throws an error if the object that has an ID', function() {
        var crudObj = new CrudObject({}, 'endpoint', ['id'], 123);
        crudObj.create.should.throw(Error);
      });

      it('uses parentId/endpoint as path', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], null, 321);
        var graphPost = sinon.stub(api.graph, 'post');
        crudObj.create();
        graphPost.should.have.been.calledWith(crudObj.getParentId() + '/' + crudObj.getEndpoint());
      });

      it('accepts params', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], null, 321);
        var graphPost = sinon.stub(api.graph, 'post');
        var params = {param: 1};
        crudObj.create(params);
        graphPost.should.have.been.calledWith(crudObj.getParentId() + '/' + crudObj.getEndpoint(), params);
      });

      it('sends object changed data', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], null, 321);
        var graphPost = sinon.stub(api.graph, 'post');
        crudObj.create();
        graphPost.should.have.been.calledWith(crudObj.getParentId() + '/' + crudObj.getEndpoint(), undefined, crudObj.getChangedData());
      });

      it('sets returned data', function(done) {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], null, 321);
        sinon.stub(api.graph, 'post').returns(new Promise(function(resolve) { resolve({id: 123}); }));
        crudObj.create()
          .then(function() {
            crudObj.id.should.be.equal(123);
            done();
          })
          .catch(done);
      });

      it('can validate data', function(done) {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], null, 321);
        sinon.stub(api.graph, 'post').returns(new Promise(function(resolve) { resolve({success: true}); }));
        crudObj.create()
          .then(function() {
            should.not.exist(crudObj.id);
            done();
          })
          .catch(done);
      });

    });

    describe('update', function() {

      it('throws an error if the object that has no ID', function() {
        var crudObj = new CrudObject({}, 'endpoint', ['id']);
        crudObj.update.should.throw(Error);
      });

      it('uses node path as path', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123, 321);
        var graphPost = sinon.stub(api.graph, 'post');
        crudObj.update();
        graphPost.should.have.been.calledWith(crudObj.getNodePath());
      });

      it('accepts params', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123);
        var graphPost = sinon.stub(api.graph, 'post');
        var params = {param: 1};
        crudObj.update(params);
        graphPost.should.have.been.calledWith(crudObj.getNodePath(), params);
      });

      it('sends object changed data', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123);
        var graphPost = sinon.stub(api.graph, 'post');
        crudObj.update();
        graphPost.should.have.been.calledWith(crudObj.getNodePath(), undefined, crudObj.getChangedData());
      });

      it('persists data', function(done) {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123, 321);
        sinon.stub(api.graph, 'post').returns(new Promise(function(resolve) { resolve({success: true}); }));
        crudObj.update()
          .then(function() {
            crudObj.getPersistedData().id.should.be.equal(123);
            done();
          })
          .catch(done);
      });

      it('can validate data', function(done) {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123, 321);
        sinon.stub(api.graph, 'post').returns(new Promise(function(resolve) { resolve({success: true}); }));
        crudObj.update({execution_options: ['validate_only']})
          .then(function() {
            should.not.exist(crudObj.getPersistedData().id);
            done();
          })
          .catch(done);
      });

    });

    describe('save', function() {

      it('creates when object has no ID', function() {
        var crudObj = new CrudObject({}, 'endpoint', ['id']);
        var create = sinon.stub(crudObj, 'create');
        crudObj.save();
        create.should.have.been.called;
      });

      it('updates when object has ID', function() {
        var crudObj = new CrudObject({}, 'endpoint', ['id'], 123);
        var update = sinon.stub(crudObj, 'update');
        crudObj.save();
        update.should.have.been.called;
      });

    });

    describe('delete', function() {

      it('uses node path as path', function() {
        var api = new FacebookAdsApi(token);
        var crudObj = new CrudObject(api, 'endpoint', ['id'], 123, 321);
        var graphDelete = sinon.stub(api.graph, 'delete');
        crudObj.delete();
        graphDelete.should.have.been.calledWith(crudObj.getNodePath());
      });

    });

  });

});
