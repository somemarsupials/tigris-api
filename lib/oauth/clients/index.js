const PROVIDERS = [
  'spotify',
];

const EXPORTS = {};

PROVIDERS.forEach(provider => {
  EXPORTS[provider] = require(`./${provider}`);
});

module.exports = EXPORTS;
