(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['ad-account'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./ad-account.js')
    );
  }
}(this, function(AdAccount) {
  'use strict';

  return {
    AdAccount: AdAccount
  };
}));
