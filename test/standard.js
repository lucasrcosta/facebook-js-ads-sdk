describe('Standard JS', () => {
  var standard = require('mocha-standard')
  it('should be respected', standard.files(['src/**/*.js', 'test/**/*.js']))
})
