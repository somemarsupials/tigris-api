const test = require('ava').test;
const sinon = require('sinon');
const requestOrigin = require('../../middlewares/requestOrigin');

let req, env, next;

test.beforeEach(() => {
  req = {
    headers: {
      host: 'domain.com'
    },
    protocol: 'http'
  };
  next = sinon.spy();
  requestOrigin(req, null, next, env);
});

test('requestOrigin middleware - includes URL', t => {
  t.deepEqual(req.origin, 'http://domain.com');
});

test('requestOrigin middleware - calls next', t => {
  t.true(next.calledOnce);
});
