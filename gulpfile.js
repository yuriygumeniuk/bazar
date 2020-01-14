var gulp 		= require('gulp');
var browserSync = require('browser-sync').create();
var sass 		= require('gulp-sass');
var plumber 	= require('gulp-plumber');
var notify 		= require('gulp-notify');
var autoprefixer= require('gulp-autoprefixer');
var watch 		= require('gulp-watch');
var gcmq		= require('gulp-group-css-media-queries');
var csscomb		= require('gulp-csscomb');
var fileinclude	= require('gulp-file-include');

gulp.task('html', function() {
	return gulp.src('./app/#source/html/index.html')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'HTML include',
				sound: false,
				message: err.message
			}
		})
	}))
	.pipe(fileinclude({
		prefix: '@@'
	}))
	.pipe(gulp.dest('./app/'))
});

gulp.task('server', ['styles', 'html'], function() {
	browserSync.init({
		server: { baseDir: './app/'},
		browser: 'chrome',
		notify: true
	});

	watch('./app/#source/**/*.scss', {readDelay: 500}, function(){gulp.start('styles');});
	watch('./app/#source/html/*.html', {readDelay: 500}, function(){gulp.start('html');});
    watch(['./app/**/*.html', './app/**/*.js', './app/img/**/*.*']).on('change', browserSync.reload);
    watch(['./app/**/*.html', './app/**/*.js', './app/img/**/*.*']).on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src('./app/#source/scss/style.scss')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Styles',
				sound: false,
				message: err.message
			}
		})
	}))
	.pipe(sass())
	.pipe(gcmq())
	.pipe(autoprefixer({
		browsers: ['last 6 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./app/css'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['server']);

gulp.task('comb', function() {
  return gulp.src('./app/#source/scss/style.scss')
    .pipe(csscomb())
    .pipe(gulp.dest('./app/#source/scss'));
});

gulp.task('notpref', function() {
  return gulp.src('./app/#source/scss/style.scss')
    .pipe(sass())
    .pipe(csscomb())
    .pipe(gulp.dest('./app/#source/scss'));
});
