/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jscs', function () {
  return gulp.src(['src/**/*.js','test/**/*.js'])
        .pipe($.jscs());
});

gulp.task('jshint', function () {
  return gulp.src(['src/**/*.js','test/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe($.mocha({reporter: 'min'}));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js','test/**/*.js'], ['jscs', 'jshint','test']);
});

gulp.task('watch-test', function () {
  gulp.watch(['src/**/*.js','test/**/*.js'], ['test']);
});

gulp.task('default', function () {
  gulp.start('watch');
});

gulp.task('all', function () {
  gulp.start(['jscs', 'jshint','test']);
});

////////////////
// Live Tests //
////////////////

gulp.task('live-jscs', function () {
  return gulp.src(['src/**/*.js','live/**/*.js'])
    .pipe($.jscs());
});

gulp.task('live-jshint', function () {
  return gulp.src(['src/**/*.js','live/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('live-watch', function () {
  gulp.watch(['src/**/*.js','live/**/*.js'], ['live-jscs', 'live-jshint']);
});

gulp.task('live-connect', function () {
  var port = 8080;
  $.connect.server({
    root: ['./live/', '.'],
    port: port
  });
  gulp.src('./test/index.html')
  .pipe($.open('', {
    url: 'http://localhost:'+port
  }));
});

gulp.task('live', function(){
  gulp.start(['live-watch','live-connect'])
});
