requirejs.config({
  paths: {
    'bluebird': './../bower_components/bluebird/js/browser/bluebird',
    'mocha': './../bower_components/mocha/mocha',
    'chai': './../bower_components/chai/chai'
  },
  shim: {
    'mocha': {
      init: function () {
        this.mocha.setup('bdd')
        return this.mocha
      }
    }
  }
})

require([
  'bluebird',
  'mocha',
  'chai'
], function (bluebird) {
  window.Promise = bluebird
  require([
    './suite'
  ], function () {
    mocha.ui('bdd')
    mocha.run()
  })
})
