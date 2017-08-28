var config = require('./config');
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', ['watch-styles', 'watch-scripts', 'watch-bower', 'watch-html', 'watch-templates']);

gulp.task('watch-styles', function () {
  var src = config.paths.src + '/assets/scss/**/*.scss';

  watch(src, function () {
    gulp.start('prep-styles-reload');
  });
});

gulp.task('watch-scripts', function () {
  var src = config.paths.src + '/app/**/*.js';

  watch(src, function (vinyl) {
    if (vinyl.event === 'change') {
      gulp.start('prep-scripts-reload');
    } else {
      gulp.start('prep-html-reload');
    }
  });
});

gulp.task('watch-bower', function () {
  var src = 'bower.json';

  watch(src, function () {
    gulp.start('prep-html-reload');
  });
});

gulp.task('watch-html', function () {
  var src = config.paths.src + '/*.html';

  watch(src, function () {
    gulp.start('prep-html-reload');
  });
});

gulp.task('watch-templates', function () {
  var src = config.paths.src + '/app/**/*.html';

  watch(src, function () {
    gulp.start('serve-reload');
  });
});
