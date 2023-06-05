const path = require('path');
const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const webpack = require('webpack-stream');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const ttf2woff2 = require('gulp-ttf2woff2');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

const dist = path.resolve(__dirname, 'dist');

// Development

function js() {
  return src('./src/js/main.js')
    .pipe(webpack({
        mode: 'development',
        output: {
            filename: 'main.js'
        },
        watch: false,
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        }
    }))
    .pipe(dest(dist))
}

function styles() {
  return src('./src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(dist));
}

function html() {
  return src('./src/*.html')
    .pipe(dest(dist));
}

function fonts() {
  src('./src/assets/fonts/*.ttf')
    .pipe(dest(dist + '/fonts'));

  return src('./src/assets/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest(dist + '/fonts'));
}

function images() {
  return src('./src/assets/images/**.*')
    .pipe(dest(dist + '/images'));
}

function favicons() {
  return src('./src/assets/favicons/**.*')
    .pipe(dest(dist));
}

function clear() {
  return del('dist');
}

function watchFiles() {
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });

  watch('./src/*.html', html);
  watch('./src/**/*.js', js);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/assets/images/**.*', images);
  watch('./src/assets/fonts/**.*', fonts);
  watch('./src/assets/favicons/**.*', favicons);

  watch('./dist/**/*.*').on('change', browserSync.reload);
}

// Production

function jsProd() {
  return src('./src/js/main.js')
      .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'main.min.js'
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            ]
          }
      }))
      .pipe(dest(dist))
}

function stylesProd() {
  return src('./src/scss/style.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(rename('style.min.css'))
      .pipe(dest(dist));
}

function htmlProd() {
  return src('./src/*.html')
      .pipe(replace('style.css', 'style.min.css'))
      .pipe(replace('main.js', 'main.min.js'))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest(dist));
}

function imagesProd() {
  return src('./src/assets/images/**.*')
    .pipe(imagemin())
    .pipe(dest(dist + '/images'));
}

exports.clear = clear;
exports.default = series(clear, parallel(html, styles, js, fonts, images, favicons), watchFiles);
exports.production = series(clear, parallel(htmlProd, stylesProd, jsProd, imagesProd, fonts, favicons));