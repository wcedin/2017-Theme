/*
 * Simple gulp setup to compile SASS and provide live reload via BrowserSync.
 *
 * How to:
 *
 * 1. Duplicate this file and rename the copy as gulpfile.js
 * 2. Change the browserSync.init options and save.
 * 3. Run gulp in the project root.
 *
 */
var gulp        = require('gulp'); 
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

// BrowserSync task for starting the server.
gulp.task('browser-sync', function() {
    // Watch files
    var files = [
    './dist/style.css'
    ];

    // Initialize BrowserSync
    browserSync.init(files, {
      // Replace with <sitename> local domain name or IP
      open:    "external",
      host:    "sitename.local",
      proxy:   "http://sitename.local:8888",
      https:   false
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("./static/src/sass/**/*.scss", ['sass']);
});
