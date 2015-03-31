if (typeof exports === 'object')
    var Promise = require('promise');
if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../../src/';
  var Collection = require(srcPath + 'objects/core/collection');
  if (typeof define === 'function' && define.amd) var Http = require(srcPath + 'http/xml-http-request');
  else var Http = require(srcPath + 'http/http');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var Collection = FacebookAdsApi.Objects.Core.Collection;
  var Http = FacebookAdsApi.Http.XmlHttpRequest;
}

describe('Collection', function() {
  'use strict';

  function Class(prop) {
    var _this = {prop: prop};
    return _this;
  }

  describe('constructor', function() {

    it('can be instantiated', function() {
      (new Collection(Class, null, {data: [], paging: null})).should.be.an('array');
    });

  });

  describe('facebook objects', function() {

    it('are instantiated with reponse data', function() {
      var collection = new Collection(Class, null, {data: ['prop1', 'prop2'], paging: null});
      collection[0].prop.should.be.equal('prop1');
      collection[1].prop.should.be.equal('prop2');
    });

  });

  describe('paging', function() {

    it('can get next page', sinon.test(function(done) {
      var httpGet = this.stub(Http, 'get');
      httpGet.returns(new Promise(function(resolve) { resolve({data: ['prop3', 'prop4']}); }));

      var collection = new Collection(Class, null, {data: ['prop1', 'prop2'], paging: {next: 'next'}});
      collection.nextPage()
        .then(function() {
          httpGet.should.have.been.calledWith('next');
          collection[0].prop.should.be.equal('prop3');
          collection[1].prop.should.be.equal('prop4');
          done();
        })
        .catch(done);
    }));

    it('can get previous page', sinon.test(function(done) {
      var httpGet = this.stub(Http, 'get');
      httpGet.returns(new Promise(function(resolve) { resolve({data: ['prop3', 'prop4']}); }));

      var collection = new Collection(Class, null, {data: ['prop1', 'prop2'], paging: {previous: 'previous'}});
      collection.previousPage()
        .then(function() {
          httpGet.should.have.been.calledWith('previous');
          collection[0].prop.should.be.equal('prop3');
          collection[1].prop.should.be.equal('prop4');
          done();
        })
        .catch(done);
    }));

  });

});
