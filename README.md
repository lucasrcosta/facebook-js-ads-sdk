# Facebook Ads API SDK for JS [![Build Status](https://travis-ci.org/lucascosta/facebook-js-ads-sdk.svg?branch=master)](https://travis-ci.org/lucascosta/facebook-js-ads-sdk)
A **Promise-based** SDK built to facilitate application development for [**Facebook Ads API**](https://developers.facebook.com/docs/ads-api).

## Installation

The SDK is is served as a [**UMD module**](https://github.com/umdjs/umd) that works in **Node**, **AMD (RequireJS)** and as a **browser global variable**.

### Client side

Load `api.js` through RequireJS or add the SDK scripts into you HTML to run as a global variable.

The SDK requires a [**Promises/A**](http://wiki.commonjs.org/wiki/Promises/A) spec implementation. These are currently supported in [most modern browsers](http://caniuse.com/#feat=promises).

### Server side

The Facebook Ads API SDK requires Node.js v 0.12 or greater for server side environment. Facebook Ads API SDK uses NPM to manage dependencies which comes bundled with Node. You can follow [this document](https://nodejs.org/download/) to install Node.js.

Install dependencies running:

`npm install`

## Usage
To instantiate an Api object you will need a valid [access token](https://developers.facebook.com/docs/marketing-api/overview#access_token):
```javaScript
var api = new FacebookAdsApi(token);
```
### Facebook Objects
Facebook Object constructors are present in the Api object an can instantiate new objcts using it's ID as an argument:
```javascript
var myAdAccount = new api.AdAccount('act_XXXXXXXXXXXXXXX');
```
New objects can also be instantiated with a data object to be saved:
```javascript
var myNewCampaign = new api.AdCampaign({name: 'My new campaign'}, 'act_XXXXXXXXXXXXXXX');
```
The object's fields can be accessed and modified as a normal JS object properties:
```javascript
myNewCampaign.name; // "My new campaign"
```
#### CRUD operations
Most of Facebook's Objects can perform Create, Read, Update, and Delete operations. These operations return **Promises** wich once resolved can alter the object's data or return the operation's `success` status:
##### Create
```javascript
myNewCampaign.create()
  .then(function() {
    myNewCampaign.id; // "12334567890"
  };
```
##### Read
```javascript
var adCampaign = new api.AdCampaign('12334567890');
adCampaign.read()
  .then(function() {
    adCampaign.name; // "My new campaign"
  };
```
##### Update
```javascript
adCampaign.name = 'Campaign new name';
adCampaign.update()
  .then(function(data) {
    data.success; // true
  };
```
##### Delete
```javascript
adCampaign.delete()
  .then(function(data) {
    data.success; // true
  };
```

## Tests

The `test` folder contains the unit test cases. The `live` folder contains tests that run against the real Facebook Api, effectively creating the Objects and deleting them afterwards (use these at your own discretion).

### Install dependencies

The client side unit tests are run in the browser. To install the dev dependencies for tests run:

`bower install`

The server side and live tests are run with gulp, which is installed among the depencencies running

`npm install`

### Configure tests
1 - Copy the config file template.
`cp test/test-data.sample.js test/test-data.js`
2 - Edit test/test-data.js with your information.


### Run tests
You can access `/test/index.html` in your browser for tests using the RequireJS loader or `/test/global.html` to run the global variable version.

The default `gulp` task will run will watch the files and run 'jscs', 'jshint' and 'test' tasks in the server.

The `gulp live` task will startup a testing server  where you can grab a Token and run the live tests.

To run tests individually:
`gulp test`
