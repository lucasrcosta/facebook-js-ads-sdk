if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('DataObject', function() {
  'use strict';

  var DataObject = FacebookAdsApi.objects.DataObject;

  var warn = console.warn;
  before(function() { console.warn = function() {}; });
  after(function() { console.warn = warn; });

  describe('constructor', function() {

    it('exists', function() {
      DataObject.should.be.a('function');
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

    it('gets current data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.getData().should.be.eql({a: 1, b: 2});
    });

  });

  describe('object data persistence', function() {

    it('data set is stored in a persistence object', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.getPersistedData().should.be.eql({a: 1, b: 2});
    });

    it('can get diff current and persisted data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.getChangedData().should.be.eql({a: 3});
    });

    it('can persist changed data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.persistData();
      dataObj.getPersistedData().should.be.eql({a: 3, b: 2});
    });

    it('can reset changed data to persisted data', function() {
      var dataObj = new DataObject(['a', 'b']);
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.resetData();
      dataObj.a.should.be.eql(1);
    });

  });

});
