var gulp 		= require('gulp');
var browserSync = require('browser-sync').create();
var sass 		= require('gulp-sass');
var plumber 	= require('gulp-plumber');
var notify 		= require('gulp-notify');
var autoprefixer= require('gulp-autoprefixer');
var watch 		= require('gulp-watch');
var gcmq		= require('gulp-group-css-media-queries');
var csscomb		= require('gulp-csscomb');

gulp.task('server', ['styles'], function() {
	
	browserSync.init({
		server: { baseDir: './app/'}
	});

    watch(['./app/**/*.html', './app/**/*.js', './app/img/**/*.*']).on('change', browserSync.reload);

	watch('./app/#source/**/*.scss', {readDelay: 500}, function(){
		gulp.start('styles');
	});

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
    // .pipe(csscomb('./.csscomb.json'))
    // .pipe(csscomb( { configPath: './.csscomb.json'  } ))
    .pipe(gulp.dest('./app/#source/scss'));
});
