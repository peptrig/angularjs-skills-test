var cleanCss = require('gulp-clean-css');
var config = require('./config');
var filter = require('gulp-filter');
var gulp = require('gulp');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifySaveLicense = require('uglify-save-license');
var useref = require('gulp-useref');

gulp.task('build', ['prep-templates', 'prep-fonts', 'prep-images', 'prep-other'], function () {
  var src = config.paths.tmp + '/*.html';
  var dest = config.paths.dist;

  var templatesInjectFile = gulp.src(config.paths.tmp + '/templates/templates.js', {read: false});
  var templatesInjectOptions = {
    starttag: '<!-- inject:templates -->',
    ignorePath: config.paths.tmp + '/templates',
    addRootSlash: false
  };

  var htmlFilter = filter('.tmp/*.html', {restore: true});
  var jsFilter = filter('.tmp/**/*.js', {restore: true});
  var cssFilter = filter('.tmp/**/*.css', {restore: true});

  return gulp.src(src)
    .pipe(inject(templatesInjectFile, templatesInjectOptions))
    .pipe(useref())
    .pipe(cssFilter)
    .pipe(sourcemaps.init())
    .pipe(replace('../../bower_components/ionic/release/fonts/', '../fonts/'))
    .pipe(cleanCss())
    .pipe(sourcemaps.write('maps'))
    .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(uglify({preserveComments: uglifySaveLicense}))
    .pipe(sourcemaps.write('maps'))
    .pipe(rev())
    .pipe(jsFilter.restore)
    .pipe(revReplace())
    .pipe(htmlFilter)
    .pipe(htmlmin())
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(dest));
});
