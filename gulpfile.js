/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jscs', function () {
  return gulp.src('src/**/*.js')
        .pipe($.jscs());
});

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe($.mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['jshint','test']);
  gulp.watch('test/**/*.js', ['test']);
});

gulp.task('default', function () {
  gulp.start('watch');
});
