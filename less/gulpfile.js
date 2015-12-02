var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var dest = '../static/css/';
var lessSrc = './styles.less';
var lessPath = './**/*.less';

gulp.task('compileLess', function() {
    gulp.src([lessSrc, '!bootstrap/**'])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest));
});

// The default task (called when you run `gulp`)
gulp.task('default', ['compileLess'], function() {
    livereload.listen(35730);
    // Watch files and run tasks if they change
    gulp.watch(lessPath).on('change', function(file) {
        runSequence('compileLess', function() {
            setTimeout(function() {
                livereload.changed(dest + 'styles.css', 35730);
            }, 200);
        });
    });
});
