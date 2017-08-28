var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('serve', ['prep-html', 'watch'], function () {
  var baseDir = ['.tmp', 'src'];

  browserSync.init({
    server: {
      baseDir: baseDir,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    // https: true,
    ghostMode: false,
    notify: false
  });
});

gulp.task('serve-reload', function () {
  browserSync.reload();
});
