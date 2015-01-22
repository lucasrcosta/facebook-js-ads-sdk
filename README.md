# Facebook Ads API SDK for JS (and Node.js) [![Build Status](https://travis-ci.org/lucascosta/facebook-js-ads-sdk.svg?branch=master)](https://travis-ci.org/lucascosta/facebook-js-ads-sdk)
A **Promise-based** SDK built to facilitate application development for [**Facebook Ads API**](https://developers.facebook.com/docs/ads-api).

#### Environments
The SDK is is served as a [**UMD module**](https://github.com/umdjs/umd) that works in Node, AMD (RequireJS) and as a browser global variable (**FacebookAdsApi**).

#### Dependency
A [**Promises/A**](http://wiki.commonjs.org/wiki/Promises/A) spec implementation. These are currently supported in [most modern browsers](http://caniuse.com/#feat=promises) and in Node.js through [node-promises](https://www.npmjs.com/package/node-promise).
## Usage
To instantiate an Api object you will need a valid [access token](https://developers.facebook.com/docs/marketing-api/overview#access_token):
```javaScript
var api = new FacebookAdsApi(token);
```
#### Facebook Objects

