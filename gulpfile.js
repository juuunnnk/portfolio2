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
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config'); // webpack.config.jsの設定を読み込む

//watch
gulp.task('watch', () => {
  gulp.watch(['./src/sass/**/*.scss', './src/js/**/*', './src/*.html', './src/json/*.json'], ['compile']);
  gulp.watch('./src/images/*', ['imageMinTask']);
});

//compile
gulp.task('compile', () => {

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

//webpack
gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("./docs/js"));

});

//画像圧縮
gulp.task('imageMin', () => {
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

gulp.task('default', ['compile', 'imageMin','webpack']);