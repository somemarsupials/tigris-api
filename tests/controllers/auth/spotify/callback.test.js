const route = require('../../../../controllers/auth/spotify/callback');

describe('/auth/spotify/callback', () => {
  let req, res;

  beforeEach(() => {
    req = {
      origin: 'site.com',
      query: {
        code: 'code'
      },
      session: {},
    };
    res = { redirect: jest.fn() };
  });

  describe('when called back', () => {
    beforeEach(() => {
      route(req, res);
    });

    it('redirects to correct location', () => {
      expect(res.redirect)
        .toHaveBeenCalledWith('site.com/#/auth/spotify/callback');
    });

    it('sets session code', () => {
      expect(req.session.code).toEqual('code');
    });
  });
});
