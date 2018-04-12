const errors = require('../errors');

module.exports = class OAuthClient {
  constructor(env, providerName, config) {
    this._env = env;
    this._providerName = providerName;
    this._config = config;
  };

  get provider() {
    return this._env.providers[this._providerName] || {};
  };

  get providerName() {
    return this._providerName;
  };

  get config() {
    return this._config;
  };

  authorise() {
    throw new errors.NotImplemented();
  };

  callback(req, res) {
    req.session.code = req.query.code;
    let name = this.providerName;

    return res.redirect(
      `${req.origin}/#/auth/${name}/callback`
    );
  };

  token() {
    throw new errors.NotImplemented();
  };
};
