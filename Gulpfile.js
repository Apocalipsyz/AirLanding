'use strict';

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream;

gulp.task('build', ['bower'], function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', prefix('last 2 versions', '> 1%', 'ie 9')))
        .pipe(minifyCss())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    gulp.src('./app/index.html')
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src('./app/styles/*.css')
        .pipe(connect.reload());
});

gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: "app/bower_components"
        }))
        .pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
    gulp.watch('bower.json', ['bower']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/styles/*.css', ['css']);
});

gulp.task('connect', ['watch'], function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});