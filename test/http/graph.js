if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var FacebookAdsApi = require(srcPath + 'api');
  var Graph = require(srcPath + 'http/graph');
  if (typeof define === 'function' && define.amd) var Http = require(srcPath + 'http/xml-http-request');
  else var Http = require(srcPath + 'http/http');
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  chai.should();
  chai.use(sinonChai);
  require('chai').should();
} else {
  var Graph = FacebookAdsApi.Http.Graph;
  var Http = FacebookAdsApi.Http.XmlHttpRequest;
}

describe('Graph', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('can be instantiated', function() {
      (new Graph()).should.be.an('object');
    });

  });

  describe('request url', function() {

    it('returns graphurl/version/path, the token, locale and parameters', function() {
      var api = new FacebookAdsApi(token);
      var url = api.graph.getGraphUrl();
      var version = api.getVersion();
      var locale = api.getLocale();
      var params = {a: 1};
      var path = 'path';
      api.graph.getRequestUrl(path, params).should.be.equal(url + 'v' + version + '/' + path + '?a=1&access_token=' + token + '&locale=' + locale);
    });

  });

  describe('requests', function() {

    it('calls a GET graph request', sinon.test(function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var httpGet = this.stub(Http, 'get');
      api.graph.get(path);
      httpGet.should.have.been.calledWith(requestUrl);
    }));

    it('calls an encoded POST graph request', sinon.test(function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var data = {a: 1};
      var httpPost = this.stub(Http, 'post');
      api.graph.post(path, data);
      httpPost.should.have.been.calledWith(requestUrl, 'a=1');
    }));

    it('calls a non-encoded POST graph request', sinon.test(function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var data = {a: 1};
      var httpPost = this.stub(Http, 'post');
      api.graph.post(path, data, null, false);
      httpPost.should.have.been.calledWith(requestUrl, {a: 1});
    }));

    it('calls a DELETE graph request', sinon.test(function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var httpDelete = this.stub(Http, 'delete');
      api.graph.delete(path);
      httpDelete.should.have.been.calledWith(requestUrl);
    }));

  });

});
