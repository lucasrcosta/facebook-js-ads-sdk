// Log wrapper for development
window.log = console.log.bind(console);

if (typeof define === 'function' && define.amd) {
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
        init: function() { return TESTDATA; }
      }
    }
  });

  require([
    './test-data',
    'http://connect.facebook.net/en_US/sdk.js',
    'mocha',
    'chai',
    'sinon',
    'sinon-chai',
    './../src/api',
  ], function(testData) {
    'use strict';

    FB.init({
      appId: testData.appId,
      xfbml: true,
      version: 'v2.2'
    });
    setLocalToken();

    require([
      './ad-account',
      // './ad-campaign',
    ]);
  });
}

function runTests() {
  var report =  document.getElementById("mocha-report");
  if(report) report.parentNode.removeChild(report);
  var stats =  document.getElementById("mocha-stats");
  if(stats) stats.parentNode.removeChild(stats);
  if(!getToken())
    console.error('Whoops, no token! How about that button up there?');
  else
    mocha.run();
}

function getToken() {
  return document.getElementById("token").value;
}

function setToken(token) {
  return document.getElementById("token").value = token;
}

/**
 * Get new token from Facebook
 */
function getNewToken() {
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
  var token;
  if (!(token = JSON.parse(localStorage.getItem('token'))))
    return false;
  if (token.expiresIn < new Date().getTime()) {
    localStorage.removeItem('token');
    return false;
  }
  setToken(token.accessToken);
}
