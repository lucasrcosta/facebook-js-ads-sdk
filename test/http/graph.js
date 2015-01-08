if (typeof require === 'function') {
  var path = require('path');
  var FacebookAdsApi = require(path.join(__dirname, '../../src/api.js'));
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  chai.should();
  chai.use(sinonChai);
}

describe('Graph', function() {
  'use strict';

  var token = 'a1b2c3d4e5';

  describe('constructor', function() {

    it('exists', function() {
      FacebookAdsApi.http.Graph.should.be.a('function');
    });

  });

  describe('requests', function() {

    it('calls a GET facebook ajax request with parameters and the token', function() {
      var api = new FacebookAdsApi(token);
      var request = sinon.stub(api.graph.http, 'getJSON');
      var url = api.graph.getGraphUrl();
      var version = api.getVersion();
      var endpoint = 'endpoint';
      var requestUrl = url + 'v' + version + '/' + endpoint + '?a=1&access_token=' + token;
      api.graph.get(endpoint, {a: 1});
      request.should.have.been.calledWith(requestUrl);
    });

  });

});
