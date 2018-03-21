var gulp = require('gulp');
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var svgo = require('gulp-svgo');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');

//compile
gulp.task('compile', function () {
  //js
  gulp.src("./src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));

  //css
  gulp.src("./sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(pleeease({
      autoprefixer: {
        browsers: ['last 2 versions']
      }
    }))
    .pipe(gulp.dest('css/'));
});

//画像圧縮
gulp.task("imageMinTask", function () {
  gulp.src("./images/*.{png,jpg,svg}")
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

gulp.task('default', function () {
  gulp.watch(['./sass/**/*.scss', './src/js/*.js'],['compile']);
  gulp.watch('./src/images/*.{png,jpg,svg}', ['imageMinTask']);
});