const ROUTES = [
  'authorise',
  'callback',
  'token'
];

class OAuthRouterGenerator {
  constructor(routes, env, clients) {
    this._routes = routes;
    this._env = env;
    this._clients = clients;
  }

  generate(router, provider) {
    let clientPrototype = this._clients[provider];

    if (!clientPrototype) {
      throw new Error('unknown client type');
    }

    let client = clientPrototype(this._env); 

    this._routes.forEach(route => {
      router.get(`/${route}`, client[route].bind(client));
    });

    return router;
  }
}

module.exports = function buildOAuthRouterGenerator (
  routes = ROUTES, 
  env = require('../../env'), 
  clients = require('./clients')
) {
  return new OAuthRouterGenerator(routes, env, clients);
};
