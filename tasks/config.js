var util = require('gulp-util');

exports.paths = {
  src: 'src',
  dist: 'www',
  tmp: '.tmp'
};

exports.angularTemplatecacheModule = 'ngskilltest';

exports.wiredepOptions = {
  exclude: [/\/ionic\.css/]
}

exports.errorHandler = function(label) {
  return function(err) {
    util.log(util.colors.red('[' + label + ']'), err.toString());
    this.emit('end');
  };
};
