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
  var Graph = FbApiAssets.http.Graph;
}

describe('Graph', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('can be instantiated', function() {
      (new Graph()).should.be.an('object');
    });

  });

  describe('requests', function() {

    it('calls a GET facebook ajax request with parameters and the token', function() {
      var api = new FacebookAdsApi(token);
      var url = api.graph.getGraphUrl();
      var version = api.getVersion();
      var endpoint = 'endpoint';
      var requestUrl = url + 'v' + version + '/' + endpoint + '?a=1&access_token=' + token;
      var requestStub = sinon.stub(api.graph.http, 'getJSON');
      api.graph.get(endpoint, {a: 1});
      requestStub.should.have.been.calledWith(requestUrl);
    });

  });

});
