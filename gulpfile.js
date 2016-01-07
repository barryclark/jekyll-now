var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	//livereload = require('gulp-livereload'),
	prefix = require('gulp-autoprefixer');

//Scritps Task
// This minimises all javascript files

gulp.task('scripts', function() {
	gulp.src('app/js/*.js')
	.pipe(uglify())
	.pipe(plumber())
	.pipe(gulp.dest('app/minjs'));
});

//Styles Task
// This minimises all style files
gulp.task('sass', function () {
  	gulp.src('app/scss/**/*.scss')
	.pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('app/css'));
    //.pipe(livereload());
});


//Image Task
// Compress images
gulp.task('image', function () {
  	gulp.src('app/img/*')
  	.pipe(imagemin())
  	.pipe(gulp.dest('app/img'));

});


//Watch Task
// This minimises all javascript files
gulp.task('watch',function () {

	//livereload.listen();

	gulp.watch('app/js/*.js',['scripts']);
	gulp.watch('app/scss/**/*.scss',['sass']);	
})

gulp.task('default', ['scripts','sass','watch']);
