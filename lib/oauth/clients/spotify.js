const OAuthClient = require('../oauthClient');
const querystring = require('querystring');

const PROVIDER = 'spotify';

const SCOPES = [
  'user-read-private',
  'user-read-email',
].join(' ');

const CONFIG = {
  response_type: 'code',
  scopes: SCOPES,
  grant_type: 'authorization_code',
};

class SpotifyOAuthClient extends OAuthClient {
  _defaultError(error) {
    return {
      status: 500,
      data: { error: error.message },
    };
  };

  _bearer(buffer = Buffer) {
    let { clientId, secret } = this.provider;
    let credentials = buffer(`${clientId}:${secret}`);
    return `Basic ${credentials.toString('base64')}`;
  };

  authorise(req, res) {
    let { config, provider } = this;

    let params = querystring.stringify({
      response_type: config.response_type,
      scopes: config.scopes,
      client_id: provider.clientId,
      redirect_uri: provider.redirectURI,
      state: req.session.id,
    });
    return res.redirect(`${provider.authoriseURI}?${params}`);
  };

  async token(req, res) {
    let response;
    
    if (!req.session.code) {
      res.status(401)
      return res.json({ error: 'no authorisation code' });
    };

    try {
      response = await req.httpClient({
        method: 'post',
        url: this.provider.tokenURI,
        data: {
          grant_type: this.config.grant_type,
          code: req.session && req.session.code,
          redirect_uri: this.provider.redirectURI,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this._bearer(),
        },
      });
    }
    catch (error) {
      response = error.response || this._defaultError(error);
    };

    res.status(response.status);
    return res.json(response.data);
  };
};

module.exports = function buildSpotifyOAuthClient(
  env = require('../../env'), 
  config = CONFIG
) {
  return new SpotifyOAuthClient(env, PROVIDER, config);
};

module.exports.class = SpotifyOAuthClient;
