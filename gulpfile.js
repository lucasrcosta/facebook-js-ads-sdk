'use strict'

var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var babel = require('rollup-plugin-babel')
var commonjs = require('rollup-plugin-commonjs')
var json = require('rollup-plugin-json')
var nodeResolve = require('rollup-plugin-node-resolve')

function rollup (format) {
  return $.rollup({
    format: format,
    exports: 'named',
    moduleName: 'fb',
    plugins: [
      babel({
        babelrc: false,
        presets: ['es2015-rollup'],
        exclude: ['**/*.json']
      }),
      nodeResolve({
        skip: [ 'chai' ]
      }),
      commonjs({
        include: [ 'node_modules/mixwith/*', 'node_modules/chai-as-promised/lib/*' ],
        namedExports: { 'mixwith': ['mix'], 'chai-as-promised': ['chaiAsPromised'] }
      }),
      json(),
    ],
    sourceMap: true
  })
}

gulp.task('test', function () {
  require('babel-core/register')
  return gulp.src(['test/*/*.js', 'test/standard.js', '!test/integration/**'], {read: false})
    .pipe($.mocha({reporter: 'min'}))
})

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js', '!test/**/suite.js*'], ['test'])
})

gulp.task('default', function () {
  gulp.start('watch')
})

gulp.task('test-bundle', function () {
  gulp.src('test/suite.es6', {read: false})
    .pipe(rollup('amd'))
    .pipe($.rename('suite.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./test'))
})

gulp.task('watch-bundle', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.*', '!test/**/suite.js*'], ['test-bundle'])
})

gulp.task('test-phantom', ['test-bundle'], function () {
  gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({
      phantomjs: { useColors: true }
    }))
})

gulp.task('test-browser', ['test-bundle'], function () {
  gulp.src('test/index.html')
    .pipe($.open())
})

gulp.task('integration', function () {
  require('babel-core/register')
  return gulp.src(['test/integration/test-integration.js'], {read: false})
    .pipe($.mocha({reporter: 'min'}))
})

gulp.task('integration-bundle', function () {
  gulp.src('test/integration/test-integration.js', {read: false})
    .pipe(rollup('amd'))
    .pipe($.rename('suite.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./test/integration'))
})

gulp.task('integration-browser', ['integration-bundle'], function () {
  gulp.src('test/integration/index.html')
    .pipe($.open())
})

gulp.task('watch-integration', function () {
  gulp.watch(['test/integration/test-integration.js'], ['integration'])
})

gulp.task('dist', function () {
  gulp.src('dist/bundle.es6', {read: false})
    .pipe(rollup('amd'))
    .pipe($.rename('amd.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
  gulp.src('dist/bundle.es6', {read: false})
    .pipe(rollup('cjs'))
    .pipe($.rename('cjs.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
  gulp.src('dist/bundle.es6', {read: false})
    .pipe(rollup('umd'))
    .pipe($.rename('umd.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
  gulp.src('dist/bundle.es6', {read: false})
    .pipe(rollup('iife'))
    .pipe($.rename('iife.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
  gulp.src('dist/bundle.es6', {read: false})
    .pipe($.rollup({ format: 'es6', exports: 'named', sourceMap: true }))
    .pipe($.rename('es6.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
  gulp.src('dist/globals.es6', {read: false})
    .pipe(rollup('cjs'))
    .pipe($.rename('globals.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
})
