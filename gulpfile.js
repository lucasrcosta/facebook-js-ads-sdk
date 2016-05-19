'use strict'

var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var babel = require('rollup-plugin-babel')
var commonjs = require('rollup-plugin-commonjs')
var json = require('rollup-plugin-json')
var nodeResolve = require('rollup-plugin-node-resolve')
var rollupAmd = $.rollup({
  format: 'amd',
  plugins: [
    babel({
      babelrc: false,
      presets: [ 'es2015-rollup' ],
      exclude: ['**/*.json']
    }),
    nodeResolve({
      skip: [ 'chai' ]
    }),
    commonjs({
      include: [ 'node_modules/mixwith/*', 'node_modules/chai-as-promised/lib/*' ],
      namedExports: { 'mixwith': ['mix'], 'chai-as-promised': ['chaiAsPromised'] }
    }),
    json()
  ],
  sourceMap: true
})

gulp.task('standard', function () {
  return gulp.src(['src/**/*.js', 'test/**/*.js*', '!test/**/suite.js*', '!dist/**/*.js', '!**/*'])
    .pipe($.standard())
    .pipe($.standard.reporter('default', {breakOnError: true}))
})

gulp.task('test', function () {
  require('babel-core/register')
  return gulp.src(['test/*/*.js', 'test/standard.js', '!test/integration/**'], {read: false})
    .pipe($.mocha({reporter: 'min'}))
})

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js', '!test/**/suite.js*'], ['standard', 'test'])
})

gulp.task('default', function () {
  gulp.start('watch')
})

gulp.task('test-bundle', function () {
  gulp.src('test/suite.es6', {read: false})
    .pipe(rollupAmd)
    .pipe($.rename('suite.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./test'))
})

gulp.task('watch-bundle', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.*', '!test/**/suite.js*'], ['test-bundle'])
})

gulp.task('test-phantom', ['bundle-tests'], function () {
  gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({
      phantomjs: { useColors: true }
    }))
})

gulp.task('test-browser', ['bundle-tests'], function () {
  gulp.src('test/index.html')
    .pipe($.open())
})

gulp.task('integration', function () {
  require('babel-core/register')
  return gulp.src(['test/integration/integration.js'], {read: false})
    .pipe($.mocha({reporter: 'min'}))
})

gulp.task('integration-bundle', function () {
  gulp.src('test/integration/integration.js', {read: false})
    .pipe(rollupAmd)
    .pipe($.rename('suite.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./test/integration'))
})

