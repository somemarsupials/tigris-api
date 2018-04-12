const OAuthClient = require('../../../lib/oauth/oauthClient');
const errors = require('../../../lib/errors');

describe('OAuthClient', () => {
  let env, client;

  beforeEach(() => {
    env = { 
      providers: {
        provider: { id: 0 },
      },
    };
    client = new OAuthClient(env, 'provider', { a: 1 });
  });

  describe('#provider', () => {
    describe('when provider exists', () => {
      it('returns provider', () => {
        expect(client.provider).toEqual({ id: 0 });
      });
    });

    describe('when provider does not exist', () => {
      beforeEach(() => {
        client._env.providers.provider = null;
      });

      it('returns empty object', () => {
        expect(client.provider).toEqual({});
      });
    });
  });

  describe('#providerName', () => {
    it('returns _providerName', () => {
      expect(client.providerName).toEqual('provider');
    });
  });

  describe('#config', () => {
    it('returns _config', () => {
      expect(client.config).toEqual({ a: 1 });
    });
  });

  describe('#authorise', () => {
    it('is not implemented', () => {
      expect(() => client.authorise()).toThrow(errors.NotImplemented);
    });
  });

  describe('#callback', () => {
    let req, res;

    beforeEach(() => {
      req = {
        query: {
          code: 'code',
        },
        origin: 'site.com',
        session: {},
      }
      res = { redirect: jest.fn() };
      client.callback(req, res);
    });

    it('sets session code to code', () => {
      expect(req.session.code).toEqual('code');
    });

    it('redirects to landing page', () => {
      expect(res.redirect)
        .toHaveBeenCalledWith('site.com/#/auth/provider/callback');
    });
  });

  describe('#token', () => {
    it('is not implemented', () => {
      expect(() => client.token()).toThrow(errors.NotImplemented);
    });
  });
});
