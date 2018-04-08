module.exports = function (req, res, next, env = require('../env')) {
  req.origin = env.client.url;
  next();
};

