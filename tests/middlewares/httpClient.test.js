const httpClient = require('../../middlewares/httpClient');

describe('httpClient middleware', () => {
  let req, client, next;

  beforeEach(() => {
    client = 'client';
    req = {};
    next = jest.fn();
    httpClient(req, null, next, client);
  });

  it('provider middleware - includes supplied data', () => {
    expect(req.httpClient).toEqual('client');
  });

  it('provider middleware - calls next', () => {
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('formatForm interceptor', () => {
  let req, formatter, rvalue;

  beforeEach(() => {
    formatter = jest.fn().mockReturnValue('formatted');
  });

  describe('when request contains form', () => {
    beforeEach(() => {
      req = {
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: 'some data',
      };
      rvalue = httpClient.formatForm(req, formatter);
    });

    it('calls formatter with data', () => {
      expect(formatter).toHaveBeenCalledWith('some data');
    });

    it('returns formatted data', () => {
      expect(rvalue.data).toEqual('formatted');
    });

    it('returns request', () => {
      expect(rvalue).toBe(req);
    });
  });

  describe('when form contains no data', () => {
    beforeEach(() => {
      req = {
        data: 'some data'
      };
      rvalue = httpClient.formatForm(req, formatter);
    });

    it('does not change data', () => {
      expect(rvalue.data).toEqual('some data');
    });

    it('returns request', () => {
      expect(rvalue).toBe(req);
    });
  });
});
