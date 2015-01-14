

// Log wrapper for development
window.log = console.log.bind(console);

requirejs.config({
    paths: {
      'appid': './appid',
    },
    shim: {
        'appid': {
        init: function() { return APPID; }
      }
    }
});

define(['http://connect.facebook.net/en_US/sdk.js', './../src/api', 'appid'], function(sdk, FacebookAdsApi, appId) {
  window.FacebookAdsApi = FacebookAdsApi;
  if (!appId) {
    console.error('No APPID. Put it in appid.js like "APPID = \'XXXXXXXXXXXXXX\'".');
    return;
  }
  FB.init({
    appId: appId,
    xfbml: true,
    version: 'v2.2'
  });
  if (token = getLocalToken()) {
    initApi(token);
  } else {
    console.error('Whoops, no token! How about that button up there?');
  }
});

/**
 * Create a new global api Object
 * @param {string} token
 */
function initApi(token) {
  window.api = new FacebookAdsApi(token);
  document.getElementById('token').innerHTML = token;
  console.info('The Facebook Ads API is ready for action!');
}

/**
 * Checks for valid token in local storage
 * @returns {string} token
 */
function getLocalToken() {
  if (!(token = JSON.parse(localStorage.getItem('token'))))
    return false;
  if (token.expiresIn < new Date().getTime()) {
    localStorage.removeItem('token');
    return false;
  }
  return token.accessToken;
}

/**
 * Get new token from Facebook
 */
function getToken() {
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
    initApi(response.authResponse.accessToken);
  }, {
    scope: 'email,ads_management,manage_pages,read_insights'
  });
}
