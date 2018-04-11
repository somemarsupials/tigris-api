const route = require('../../../../controllers/auth/spotify/authorise');

describe('auth/spotify/authorise', () => {
  let req, res;

  beforeEach(() => {
    req = {
      origin: 'site.com',
      provider: {
        clientId: 0,
        authoriseURI: 'auth.com'
      },
      session: {
        id: 1
      },
    };
    res = { redirect: jest.fn() };
    route(req, res, null);
  });

  it('redirects correctly', () => {
    expect(res.redirect.mock.calls).toMatchSnapshot();
  });

  it('calls redirect once', () => {
    expect(res.redirect).toHaveBeenCalledTimes(1);
  });
});
