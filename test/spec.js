if (typeof define === 'function' && define.amd) {
  requirejs.config({
    paths: {
      'mocha': './../bower_components/mocha/mocha',
      'chai': './../bower_components/chai/chai',
      'sinon': './../bower_components/sinonjs/sinon',
      'sinon-chai': './../bower_components/sinon-chai/lib/sinon-chai'
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
      }
    }
  });

  require([
    'mocha',
    'chai',
    'sinon',
    'sinon-chai',
    './../src/api',
    './../src/objects/mixins/cannot-update' //temp
  ], function() {
    'use strict';

    require([
      './api',
      './http/xml-http-request',
      './http/graph',
      './objects/core/data-object',
      './objects/core/crud-object',
      './objects/ad-account',
      './objects/ad-campaign',
      './objects/mixins',
    ], function() {
      mocha.run();
    });
  });
}
