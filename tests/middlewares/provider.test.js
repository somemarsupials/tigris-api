const test = require('ava').test;
const sinon = require('sinon');
const provider = require('../../middlewares/provider');

let req, env, next;

test.beforeEach(() => {
  env = {
    providers: {
      hello: 'world'
    }
  }
  req = {};
  next = sinon.spy();
  provider('hello')(req, null, next, env);
});

test('provider middleware - includes supplied data', t => {
  t.deepEqual(req.provider, 'world');
});

test('provider middleware - calls next', t => {
  t.true(next.calledOnce);
});
