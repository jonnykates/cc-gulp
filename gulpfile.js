'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var webserver = require('gulp-webserver');

gulp.task('compile', function() {
	return gulp.src('./main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./')) // Create a sourcemap alongside main.css at the root
		.pipe(gulp.dest('./')) // This is where the output of main.scss (i.e. main.css) will end up.
});

gulp.task('webserver', function() { // Spin up our local server. This is going to serve our CSS & JS files.
  gulp.src('./') // Running from the root
    .pipe(webserver({
      port: 8000, // Specifying port for two reasons. Firstly, so we don't have to change it in the Manager each time and secondly because we want to make sure it is different from BrowserSync's port, which we're running in proxy
      open: true, // Open localhost:8000 in a new browser tab on run. Set to false if this is annoys you.
      directoryListing: true, // Root of localhost:8000 will show a nice UI of the directory, why not.
      livereload: true // This api option means that changes to files are reflected live on the local server. Might need livereload browser extension?
    }));
  gulp.watch('./**/*.scss', ['compile']); // Listen for changes to SCSS partials and then run the compile task outlined above
});

gulp.task('browser-sync-proxy', function() {
	browserSync.init({
    proxy: "http://codeclippen1.ritdns.com", // Our platform URL
    port: 3000
  });
  gulp.watch(['./main.css', './main.js']).on('change', browserSync.reload); // Listen to the main.css and main.js files, which will get updated each time we call the compile task. When it does, refresh our proxy server. Voila - live reloading!
});

gulp.task('default', ['webserver', 'browser-sync-proxy']); // Chain our tasks into the default task