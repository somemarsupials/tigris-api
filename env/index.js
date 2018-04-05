const yaml = require('js-yaml');
const fs = require('fs');

const source = `${__dirname}/${process.env.NODE_ENV || 'development'}.yaml`;

try {
  module.exports = yaml.safeLoad(fs.readFileSync(source));
}
catch (error) {
  throw new Error(`cannot locate config at: ${source})`);
};
