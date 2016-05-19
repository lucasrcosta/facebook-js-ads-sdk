if (typeof define === 'function' && define.amd) {
  requirejs.config({
    paths: {
      'mocha': './../../bower_components/mocha/mocha',
      'chai': './../../bower_components/chai/chai',
      'sinon': './../../bower_components/sinonjs/sinon',
      'sinon-chai': './../../bower_components/sinon-chai/lib/sinon-chai'
    },
    shim: {
      'mocha': {
        init: function () {
          this.mocha.setup('bdd')
          return this.mocha
        }
      },
      'sinon': {
        init: function () {
          return this.sinon
        }
      }
    }
  })

  require([
    'mocha',
    'chai',
    'sinon',
    'sinon-chai'
  ], function () {
    require([
      './suite'
    ], function () {
      mocha.ui('bdd')
      mocha.run()
    })
  })
}
