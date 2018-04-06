module.exports = function (req, res, next) {
  req.origin = `${req.protocol}://${req.headers.host}`;
  next();
};

