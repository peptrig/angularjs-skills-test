var config = require('./config');
var del = require('del');
var gulp = require('gulp');

gulp.task('clean', function () {
  var src = [
    config.paths.dist + '/**/*',
    '!' + config.paths.dist + '/.gitkeep',
    config.paths.tmp
  ];

  return del(src);
});
