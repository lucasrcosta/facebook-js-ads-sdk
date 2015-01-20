if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../../src/';
  var DataObject = require(srcPath + 'objects/core/data-object');
  require('chai').should();
} else {
  var DataObject = FacebookAdsApi.Objects.Core.DataObject;
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
      var dataObj = new DataObject(['a', 'b', 'c', 'd', 'e', 'f']);
      dataObj.setData({a: 1, b: 2, c: [3, 4], d: [5, 6], e: {a: 7, b: 8}, f: null});
      dataObj.a = 2;
      dataObj.c[1] = 8;
      dataObj.e.b = 16;
      dataObj.f = {'g':[9, 10]};
      dataObj.persistData();
      dataObj.getPersistedData().should.be.eql({a: 2, b: 2, c: [3, 8], d: [5, 6], e: {a: 7, b: 16}, f: {'g':[9, 10]}});
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

    it('can get deep diff current and persisted data', function() {
      var dataObj = new DataObject(['a', 'b', 'c', 'd', 'e', 'f']);
      dataObj.setData({a: 1, b: 2, c: [3, 4], d: [5, 6], e: {a: 7, b: 8}, f: {a: 9, b: 10}}, true);
      dataObj.a = 2;
      dataObj.c[1] = 8;
      dataObj.e.b = 16;
      dataObj.getChangedData().should.be.eql({a: 2, c: [3, 8], e: {a: 7, b: 16}});
    });

    it('can reset changed data to persisted data', function() {
      var dataObj = new DataObject(['a', 'b', 'c', 'd', 'e', 'f']);
      dataObj.setData({a: 1, b: 2, c: [3, 4], d: [5, 6], e: {a: 7, b: 8}, f: {a: 9, b: 10}}, true);
      dataObj.a = 2;
      dataObj.c[1] = 8;
      dataObj.e.b = 16;
      dataObj.resetData();
      dataObj.a.should.be.equal(1);
      dataObj.c[1].should.be.equal(4);
      dataObj.e.b.should.be.equal(8);
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
