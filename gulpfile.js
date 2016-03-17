// --------- //
// PACKAGES  //
// --------- //

// gulp
var gulp = require('gulp');

// js
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');




// --------- //
//   TASKS   //
// --------- //

// jshint (TODO: make this workable)
gulp.task('jshint', function() {
	gulp.src('./assets/scripts/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

// scripts
gulp.task('scripts', function() {
	gulp.src(['./bower_components/jquery/dist/jquery.js',
				'./bower_components/velocity/velocity.js',
				'./bower_components/velocity/velocity.ui.js',
				'./bower_components/amplify/lib/amplify.js',
				'./bower_components/waypoints/lib/jquery.waypoints.js',
				'./assets/scripts/_utilities.js',
				'./assets/scripts/_animation.js',
				'./assets/scripts/_video.js',
				'./assets/scripts/_main.js'
			])
			.pipe(concat('main-build.js'))
			//.pipe(stripDebug())
			//.pipe(uglify())
			.pipe(gulp.dest('assets/scripts'));
});

// watch
gulp.task('watch', function() {
	gulp.watch('assets/scripts/**', ['scripts']);
});

// default
gulp.task('default', ['scripts', 'watch']);


