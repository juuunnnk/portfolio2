const gulp = require('gulp');
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const svgo = require('gulp-svgo');
const plumber = require('gulp-plumber');
const pleeease = require('gulp-pleeease');

//compile
gulp.task('compile', () => {
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
    .pipe(gulp.dest("dist/images/"));
});

gulp.task('default', () => {
  gulp.watch(['./sass/**/*.scss', './src/js/*.js'],['compile']);
  gulp.watch('./src/images/*.{png,jpg,svg}', ['imageMinTask']);
});