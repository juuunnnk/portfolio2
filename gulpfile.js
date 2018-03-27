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
const webpack = require('webpack');

//compile
gulp.task('compile', () => {
  //js
  gulp.src('./src/js/**/*')
    .pipe(babel())
    .pipe(gulp.dest('./docs/js/'));

  //css
  gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(pleeease({
      autoprefixer: {
        browsers: ['last 2 versions']
      }
    }))
    .pipe(gulp.dest('./docs/css/'));

  //html移動
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./docs/'));

  //json移動
  gulp.src('./src/json/**/*')
    .pipe(gulp.dest('./docs/json/'));
});

//画像圧縮
gulp.task('imageMinTask', () => {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./docs/images/'));

  gulp.src('./docs/images/**/*.{png,jpg,svg}')
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
    .pipe(gulp.dest('./docs/images/'));
});

gulp.task('watch', () => {
  gulp.watch(['./src/sass/**/*.scss', './src/js/*.es6', './src/*.html', './src/json/*.json'], ['compile']);
  gulp.watch('./src/images/*', ['imageMinTask']);
});

gulp.task('default', ['compile', 'imageMinTask', 'watch']);