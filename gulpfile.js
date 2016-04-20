"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssMin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/foundation.js',
        'js/foundation.equalizer.js',
        'js/foundation.reveal.js'
    ])
        .pipe(maps.init())
        .pipe(concat('foundation.base+equalizer+reveal.js'))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
    return gulp.src("js/foundation.base+equalizer+reveal.js")
        .pipe(uglify())
        .pipe(rename("foundation.base+equalizer+reveal.min.js"))
        .pipe(gulp.dest("js"));
});

gulp.task("compileSass", function() {
    return gulp.src("scss/application.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write("./"))
        .pipe(gulp.dest("css"));
});

gulp.task("minifyCss",["compileSass"], function() {
    return gulp.src('css/application.css')
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("css"));
});

gulp.task("watchProject", function() {
    gulp.watch("scss/*.scss", ['compileSass']);
});

gulp.task("clean", function() {
    del(['dist', 'css/application*.css*', 'js/foundation.base+equalizer+reveal*.js*']);
});

gulp.task("build", ["minifyScripts", "minifyCss"], function() {
    return gulp.src(["css/*.css", "js/foundation.base+equalizer+reveal.min.js", "index.html", "img/**", "assets/**"], {base: "./"})
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
    gulp.start("build");
});

