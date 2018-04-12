const provider = require('../../middlewares/provider');

describe('provider middleware', () => {
  let req, env, next;

  beforeEach(() => {
    env = {
      providers: {
        hello: 'world'
      }
    };
    req = {};
    next = jest.fn();
    provider('hello')(req, null, next, env);
  });

  it('includes supplied data', () => {
    expect(req.provider).toEqual('world');
  });

  it('provider middleware - calls next', () => {
    expect(next).toHaveBeenCalledTimes(1);
  });
});
