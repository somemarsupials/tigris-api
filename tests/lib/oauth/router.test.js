const buildOAuthRouterGenerator = require('../../../lib/oauth/router');

describe('OAuthRouterGenerator', () => {
  let routes, clients, routerGenerator;

  beforeEach(() => {
    routes = ['a', 'b'];
    clients = {
      '1': jest.fn().mockReturnValue({
        'a': { bind: jest.fn().mockReturnValue('aFunc') },
        'b': { bind: jest.fn().mockReturnValue('bFunc') },
      }),
    };
    routerGenerator = buildOAuthRouterGenerator(routes, 'env', clients);
  });

  describe('#generate', () => {
    let rvalue, router;

    describe('when provider exists', () => {
      beforeEach(() => {
        router = { get: jest.fn() };
        rvalue = routerGenerator.generate(router, '1');
        routerGenerator.generate(router, '1');
      });

      it('generates route a', () => {
        expect(router.get).toHaveBeenCalledWith('/a', 'aFunc');
      });

      it('generates route b', () => {
        expect(router.get).toHaveBeenCalledWith('/b', 'bFunc');
      });

      it('returns router', () => {
        expect(rvalue).toEqual(router);
      });
    });
  });
});
