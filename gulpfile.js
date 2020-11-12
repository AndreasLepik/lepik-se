const { src, dest, parallel } = require('gulp');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');

const paths = {
  src: 'src',
  dest: 'dist',
};

function html() {
  return src(`${paths.src}/*.html`)
    .pipe(htmlmin())
    .pipe(dest(paths.dest));
}

function css() {
  const plugins = [autoprefixer(), cssnano()];
  return src(`${paths.src}/*.css`)
    .pipe(postcss(plugins))
    .pipe(dest(paths.dest));
}

function copy() {
  return src(`${paths.src}/webbadoodle/*`)
    .pipe(dest(`${paths.dest}/webbadoodle`));
}

function images() {
  return src(`${paths.src}/images/*`)
  .pipe(imagemin())
  .pipe(dest(`${paths.dest}/images`));
}

exports.default = parallel(html, css, images, copy);
