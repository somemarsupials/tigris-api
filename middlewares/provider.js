module.exports = function (provider) {
  return function (req, res, next, env = require('../env')) {
    req.provider = env.providers[provider];
    next();
  };
};
