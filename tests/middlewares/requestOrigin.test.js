const requestOrigin = require('../../middlewares/requestOrigin');

describe('requestOrigin middleware', () => {
  let req, env, next;

  beforeEach(() => {
    req = {};
    next = jest.fn();
    env = { client: { url: 'http://domain.com' } };
    requestOrigin(req, null, next, env);
  });

  it('includes URL', () => {
    expect(req.origin).toEqual('http://domain.com');
  });

  it('requestOrigin middleware - calls next', () => {
    expect(next).toHaveBeenCalledTimes(1);
  });
});
