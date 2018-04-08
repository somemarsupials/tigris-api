const querystring = require('querystring');

module.exports = function (req, res, next) {
  let params = querystring.stringify({
    response_type: 'code',
    scopes: 'user-read-private user-read-email',
    client_id: req.provider.clientId,
    redirect_uri: req.provider.redirectURI,
    state: 'tigris',
  });

  res.redirect(`${req.provider.authoriseURI}?${params}`);
};
