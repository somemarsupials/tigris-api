const axios = require('axios');
const qs = require('querystring');

function isForm(req) {
  return req.headers['Content-Type'] === 'application/x-www-form-urlencoded';
}

function formatForm(req, formatter = qs.stringify) {
  if (req.method === 'post' && isForm(req)) {
    req.data = formatter(req.data);
  }
  return req;
}

axios.interceptors.request.use(formatForm);

module.exports = function (req, res, next, httpClient = axios) {
  req.httpClient = httpClient;
  next();
};

module.exports.formatForm = formatForm;
