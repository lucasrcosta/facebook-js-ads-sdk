if (typeof require === 'function') {
  var DataObject = require('./../../src/objects/data-object.js');
  require('chai').should();
} else {
  var DataObject = FbApiAssets.coreObjects.DataObject;
}

describe('DataObject', function() {
  'use strict';

  describe('constructor', function() {

    it('can be instantiated', function() {
      (new DataObject(['a', 'b'])).should.be.an('object');
    });

  });

  describe('object data fields', function() {

    it('sets (on instantiation) and gets data fields', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.getFields().should.be.eql(['a', 'b']);
    });

    it('sets object properties from data fields', function() {
      var dataObj = new DataObject(['a', 'b']);
      should.not.equal(dataObj.a, undefined);
      should.not.equal(dataObj.b, undefined);
    });

    it('creates a fields object property', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.fields.should.be.eql({a: 'a', b: 'b'});
    });

    it('assures that the fields object is frozen (throws error on strict)', function() {
      (function() {
        var dataObj = new DataObject(['a', 'b']);
        dataObj.fields.a = 'c';
      }).should.throw(TypeError);
    });

  });

  describe('setting data', function() {

    it('can set a data field value', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.set('a', 1);
      dataObj.a.should.be.equal(1);
    });

    it('throws an error when setting an unregistered field', function() {
      (function() {
        var dataObj = new DataObject(['a', 'b']);
        dataObj.set('c', 1);
      }).should.throw(Error);
    });

    it('can set multiple data fields values', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.a.should.be.equal(1);
      dataObj.b.should.be.equal(2);
    });

    it('returns the object on set operations (chaining)', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2}).should.be.eql(dataObj);
      dataObj.set('a', 3).should.be.eql(dataObj);
    });

    it('can set initial data', function() {
      var dataObj = new DataObject(['a', 'b'], {a: 1, b: 2});
      dataObj.getData().should.be.eql({a: 1, b: 2});
    });

  });

  describe('persistence', function() {

    it('can persist changed data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.persistData();
      dataObj.getPersistedData().should.be.eql({a: 3, b: 2});
    });

    it('setData,false does not persist', function() {
      var dataObj = new DataObject(['a', 'b']);
      var data = {a: 1, b: 2};
      dataObj.setData(data, false);
      dataObj.getPersistedData().should.be.eql({});
    });

    it('setData,true persists', function() {
      var dataObj = new DataObject(['a', 'b']);
      var data = {a: 1, b: 2};
      dataObj.setData(data, true);
      dataObj.getPersistedData().should.be.eql(data);
    });

    it('can get diff current and persisted data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2}, true);
      dataObj.a = 3;
      dataObj.getChangedData().should.be.eql({a: 3});
    });

    it('can reset changed data to persisted data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2}, true);
      dataObj.a = 3;
      dataObj.resetData();
      dataObj.a.should.be.eql(1);
    });

  });

  describe('getting data', function() {

    it('gets current data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.getData().should.be.eql({a: 1, b: 2});
    });

  });

});
