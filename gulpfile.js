const fs = require('fs');
const gulp = require('gulp');
const yaml = require('js-yaml');

function nullify(object) {
  let nullified = {};

  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      nullified[key] = nullify(object[key]);
    }
    else {
      nullified[key] = null;
    }
  });

  return nullified;
}

gulp.task('template-env', function () {
  let template = yaml.dump(nullify(require('./env')));
  fs.writeFileSync('./env/template.yaml', template);
});
