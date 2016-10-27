'use strict'

var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var babel = require('rollup-plugin-babel')
var babelrc = require('babelrc-rollup')
var commonjs = require('rollup-plugin-commonjs')
var json = require('rollup-plugin-json')
var nodeResolve = require('rollup-plugin-node-resolve')
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('test', function () {
  require('babel-register')
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
  roll('amd', './test', 'suite.es6', 'suite', './test')
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
  require('babel-register')
  return gulp.src(['test/integration/test-integration.js'], {read: false})
    .pipe($.mocha({reporter: 'min'}))
})

gulp.task('integration-bundle', function () {
  roll('amd', './test/integration', 'test-integration.js', 'suite', './test/integration')
})

gulp.task('integration-browser', ['integration-bundle'], function () {
  gulp.src('test/integration/index.html')
    .pipe($.open())
})

gulp.task('watch-integration', function () {
  gulp.watch(['test/integration/test-integration.js'], ['integration'])
})

function roll (format, entry_dir, entry, name, dest_dir) {
  name = (name || format) + '.js'
  dest_dir = dest_dir || './dist'
  return rollup({
    entry: entry_dir + '/' + entry,
    format: format,
    exports: 'named',
    moduleName: 'fb',
    plugins: [
      babel(babelrc.default({
        config: {
          presets: [
            [
              'es2015',
              { 'modules': false }
            ]
          ],
          plugins: ['external-helpers'],
          exclude: ['node_modules/**', '**/*.json']
        }
      })),
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
  .pipe(source(entry, entry_dir))
  .pipe(buffer())
  .pipe($.sourcemaps.init({loadMaps: true}))
  .pipe($.rename(name))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(dest_dir))
}

gulp.task('dist', function () {
  roll('amd', './dist', 'bundle.es6')
  roll('cjs', './dist', 'bundle.es6')
  roll('umd', './dist', 'bundle.es6')
  roll('iife', './dist', 'bundle.es6')
  roll('es', './dist', 'bundle.es6')
  roll('cjs', './dist', 'globals.es6', 'globals')
})
