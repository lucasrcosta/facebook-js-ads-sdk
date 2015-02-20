
window.FacebookAdsApi;
window.api; // global FacebookAdsApi instance
window.testData;
window.log = console.log.bind(console); // Log wrapper

var tests = [
  './objects/ad-account',
  './objects/ad-campaign',
  './objects/ad-set',
];

requirejs.config({
  paths: {
    'mocha': './../bower_components/mocha/mocha',
    'chai': './../bower_components/chai/chai',
    'sinon': './../bower_components/sinonjs/sinon',
    'sinon-chai': './../bower_components/sinon-chai/lib/sinon-chai',
    'appid': './appid',
  },
  shim: {
    'mocha': {
      init: function() {
        'use strict';
        this.mocha.setup('bdd');
        return this.mocha;
      }
    },
    'sinon': {
      init: function() {
        'use strict';
        return this.sinon;
      }
    },
    'test-data': {
      init: function() {
        'use strict';
        return TESTDATA;
      }
    }
  }
});

require([
  './../src/api',
  './test-data',
  'mocha',
  'chai',
  'sinon',
  'sinon-chai',
  'http://connect.facebook.net/en_US/sdk.js',
], function(Api, tstData, mocha, chai) {
  'use strict';

  window.FacebookAdsApi = Api;
  window.testData = tstData;
  chai.should();

  setLocalToken();

  FB.init({
    appId: testData.appId,
    xfbml: true,
    version: 'v2.2'
  });

  require(tests);
});

function runTests() {
  'use strict';

  var report =  document.getElementById('mocha-report');
  if (report) report.parentNode.removeChild(report);
  var stats =  document.getElementById('mocha-stats');
  if (stats) stats.parentNode.removeChild(stats);
  var token = getToken();
  if (!token)
    throw new Error('Whoops, no token! How about that button up there?');

  window.api = new FacebookAdsApi(token);
  mocha.run();
}

function getToken() {
  'use strict';
  return document.getElementById('token').value;
}

function setToken(token) {
  'use strict';
  document.getElementById('token').value = token;
  window.api = new FacebookAdsApi(token);
}

/**
 * Get new token from Facebook
 */
function getNewToken() {
  'use strict';
  FB.login(function(response) {
    if (!response.authResponse) {
      console.error('Auth Error', response);
      return;
    }
    var tokenData = JSON.stringify({
      accessToken: response.authResponse.accessToken,
      expiresIn: new Date().getTime() + response.authResponse.expiresIn * 1000
    });
    localStorage.setItem('token', tokenData);
    setToken(response.authResponse.accessToken);
  }, {
    scope: 'email,ads_management,manage_pages,read_insights'
  });
}
/**
 * Checks for valid token in local storage
 * @returns {string} token
 */
function setLocalToken() {
  'use strict';
  var token;
  if (!(token = JSON.parse(localStorage.getItem('token'))))
    return false;
  if (token.expiresIn < new Date().getTime()) {
    localStorage.removeItem('token');
    return false;
  }
  setToken(token.accessToken);
}
