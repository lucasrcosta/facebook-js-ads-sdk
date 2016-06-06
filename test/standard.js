describe('Standard JS', function () {
  this.timeout(5000)
  var standard = require('mocha-standard')
  it('should be respected', standard.files(['src/**/*.js', 'test/**/*.js']))
})
