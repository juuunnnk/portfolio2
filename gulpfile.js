const gulp = require('gulp');
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const svgo = require('gulp-svgo');
const plumber = require('gulp-plumber');
const pleeease = require('gulp-pleeease');

//compile
gulp.task('compile', () => {
  //js
  gulp.src("./babel/*.es6")
    .pipe(babel())
    .pipe(gulp.dest('./js/'));

  //js圧縮
  // gulp.src("./js/*.js")
  //   .pipe(plumber())
  //   .pipe(uglify())
  //   .pipe(rename({
  //     extname: '.min.js'
  //   }))
  //   .pipe(gulp.dest('./js/'));

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
gulp.task("imageMinTask", () => {
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
    .pipe(gulp.dest("/images/"));
});

gulp.task('default', () => {
  gulp.watch(['./sass/**/*.scss', './babel/*.es6'], ['compile']);
  gulp.watch('./images/*.{png,jpg,svg}', ['imageMinTask']);
});