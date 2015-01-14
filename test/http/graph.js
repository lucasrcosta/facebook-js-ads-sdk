if (typeof require === 'function') {
  var FacebookAdsApi = require('./../../src/api.js');
  var Graph = require('./../../src/http/graph.js');
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  chai.should();
  chai.use(sinonChai);
  require('chai').should();
} else {
  var Graph = FbApiAssets.Http.Graph;
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

    it('calls a GET graph request', function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var graphGetJSON = sinon.stub(api.graph.http, 'getJSON');
      api.graph.get(path);
      graphGetJSON.should.have.been.calledWith(requestUrl);
    });

    it('calls a POST graph request', function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var data = {a: 1};
      var graphPostJSON = sinon.stub(api.graph.http, 'postJSON');
      api.graph.post(path, null, data);
      graphPostJSON.should.have.been.calledWith(requestUrl, data);
    });

    it('calls a DELETE graph request', function() {
      var api = new FacebookAdsApi(token);
      var path = 'path';
      var requestUrl = api.graph.getRequestUrl(path);
      var graphDeleteJSON = sinon.stub(api.graph.http, 'deleteJSON');
      api.graph.delete(path);
      graphDeleteJSON.should.have.been.calledWith(requestUrl);
    });

  });

});
