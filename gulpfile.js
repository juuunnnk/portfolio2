var gulp = require('gulp');
var sass = require('gulp-sass')
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var svgo = require('gulp-svgo');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var babel = require('gulp-babel');

gulp.task('sass', function() {
  gulp.src("./src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(pleeease({
      autoprefixer: {
        browsers: ['last 2 versions']
      }}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('minify-js', function() {
  return gulp.src("./src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task("imageMinTask", function() {
  gulp.src("./src/images/*.{png,jpg,svg}")
    .pipe(imagemin([
      pngquant({
        quality: '65-80',
        speed: 1,
        floyd: 0
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      svgo(),
    ]))
    .pipe(gulp.dest("dist/images/"));
});

gulp.task('default', function() {
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['minify-js']);
  gulp.watch('./src/images/*.{png,jpg,svg}', ['imageMinTask']);
});
