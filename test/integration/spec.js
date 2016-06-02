requirejs.config({
  paths: {
    'mocha': './../../bower_components/mocha/mocha',
    'chai': './../../bower_components/chai/chai'
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
  'mocha',
  'chai'
], function () {
  require([
    './suite'
  ], function () {
    mocha.ui('bdd')
    mocha.run()
  })
})
