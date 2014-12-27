if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  require('chai').should();
}

describe('FacebookAdsApi.DataObject', function() {
  'use strict';

  var warn = console.warn;

  before(function() {
    console.warn = function() {};
  });

  after(function() {
    console.warn = warn;
  });

  describe('constructor', function() {
    it('exists', function() {
      FacebookAdsApi.DataObject.should.be.a('function');
    });
  });

  describe('object data fields', function() {
    it('can set data fields from an object', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2});
      dataObj.a.should.be.equal(1);
      dataObj.b.should.be.equal(2);
    });

    it('appends underscores on public function conflicting object data fields', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.a = function() {};
      dataObj._a = function() {};
      dataObj.setData({a: 1, b: 2});
      dataObj.__a.should.be.equal(1);
    });

    it('can set data fields individually', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.set('a', 1);
      dataObj.a.should.be.equal(1);
    });

    it('appends underscores on public function conflicting data fields', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.a = function() {};
      dataObj._a = function() {};
      dataObj.set('a', 1);
      dataObj.__a.should.be.equal(1);
    });

    it('gets current data fields', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2});
      dataObj.getData().should.be.eql({a: 1, b: 2});
    });

    it('returns the object on set operations', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2}).should.be.eql(dataObj);
      dataObj.set('c', 3).should.be.eql(dataObj);
    });

    it('can set initial data', function() {
      var dataObj = new FacebookAdsApi.DataObject({a: 1, b: 2});
      dataObj.getData().should.be.eql({a: 1, b: 2});
    });
  });

  describe('object data persistence', function() {
    it('data set is stored in a persistence object', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.getPersistedData().should.be.eql({a: 1, b: 2});
    });

    it('can get diff current and persisted data', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.getChangedData().should.be.eql({a: 3});
    });

    it('can persist changed data', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.persistData();
      dataObj.getPersistedData().should.be.eql({a: 3, b: 2});
    });

    it('can reset changed data to persisted data', function() {
      var dataObj = new FacebookAdsApi.DataObject();
      dataObj.setData({a: 1, b: 2});
      dataObj.a = 3;
      dataObj.resetData();
      dataObj.a.should.be.eql(1);
    });
  });
});
