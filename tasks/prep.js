var angularTemplatecache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var config = require('./config');
var eslint = require('gulp-eslint');
var extend = require('lodash/fp/extend');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;

gulp.task('prep-styles', function () {
  return prepStyles();
});

gulp.task('prep-styles-reload', function () {
  return prepStyles()
    .pipe(browserSync.stream());
});

function prepStyles() {
  var src = config.paths.src + '/assets/scss/styles.scss';
  var dest = config.paths.tmp + '/assets/css/';
  var sassOptions = {
    style: 'expanded'
  };

  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(sassOptions).on('error', config.errorHandler('styles')))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
}

gulp.task('prep-scripts', function () {
  return prepScripts();
});

gulp.task('prep-scripts-reload', function () {
  return prepScripts()
    .pipe(browserSync.stream());
});

function prepScripts() {
  var src = config.paths.src + '/app/**/*.js';

  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format());
}

gulp.task('prep-html', ['prep-styles', 'prep-scripts'], function () {
  var src = config.paths.src + '/*.html';
  var dest = config.paths.tmp;
  var wiredepOptions = {
    ignorePath: ['../' + config.paths.tmp]
  };
  var injectFiles = [
    config.paths.tmp + '/assets/css/**/*.css',
    config.paths.src + '/app/**/*.module.js',
    config.paths.src + '/app/**/*.js',
    '!' + config.paths.src + '/app/**/*.spec.js',
    '!' + config.paths.src + '/app/**/*.mock.js'
  ];
  var injectOptions = {
    ignorePath: ['src/', '.tmp/'],
    addRootSlash: false
  };

  return gulp.src(src)
    .pipe(wiredep(extend(wiredepOptions, config.wiredepOptions)))
    .pipe(inject(gulp.src(injectFiles), injectOptions))
    .pipe(gulp.dest(dest));
});

gulp.task('prep-html-reload', ['prep-html'], function () {
  browserSync.reload();
});

gulp.task('prep-templates', ['prep-html'], function () {
  var src = [
    config.paths.src + '/app/**/*.html',
    config.paths.tmp + '/app/**/*.html'
  ];
  var dest = config.paths.tmp + '/templates/';

  return gulp.src(src)
    .pipe(htmlmin())
    .pipe(angularTemplatecache({
      module: config.angularTemplatecacheModule,
      root: 'app'
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('prep-fonts', function () {
  var src = mainBowerFiles();
  var dest = config.paths.dist + '/assets/fonts/';

  return gulp.src(src)
    .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest(dest));
});

gulp.task('prep-images', function prepareImages() {
  var src = config.paths.src + '/assets/img/**/*.*';
  var dest = config.paths.dist + '/assets/img/';

  return gulp.src(src)
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});

gulp.task('prep-other', function prepareOther() {
  var src = [
    config.paths.src + '/**/*',
    '!' + config.paths.src + '/**/*.{html,css,js,scss}',
    '!' + config.paths.src + '/assets/img/**/*.*'
  ];
  var dest = config.paths.dist;
  var fileFilter = filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src(src)
    .pipe(fileFilter)
    .pipe(gulp.dest(dest));
});
