const route = require('../../../../controllers/auth/spotify/token');

describe('/auth/spotify/token', () => {
  let req, res, authRes;

  beforeEach(() => {
    authRes = {
      status: 200,
      data: 'data'
    };
    req = {
      body: {
        callback: 'callback',
      },
      provider: {
        callbackURI: 'callback.com',
        redirect_uri: 'uri',
        bearerBase64: 'credentials',
      },
      httpClient: jest.fn().mockReturnValue(authRes),
      session: { code: 'code' },
    };
    res = { 
      status: jest.fn(),
      json: jest.fn()
    };
  });

  describe('when making API request', () => {
    beforeEach(() => {
      route(req, res);
    });

    it('makes correct API request', () => {
      expect(req.httpClient.mock.calls).toMatchSnapshot();
    });

    it('makes one API request', () => {
      expect(req.httpClient).toHaveBeenCalledTimes(1);
    });
  });

  describe('when no code present', () => {
    beforeEach(() => {
      req.session = {};
      route(req, res);
    });

    it('sets 401 status', () => {
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('sends error message', () => {
      expect(res.json).toHaveBeenCalledWith({ 
        error: 'no authorisation code'
      });
    });
  });

  describe('when error', () => {
    let error;

    beforeEach( () => {
      error = new Error();
      error.response = {
        status: 404,
        data: 'error'
      };
      req.httpClient = jest.fn().mockImplementation(() => { 
        throw error;
      });
      route(req, res);
    });

    it('uses error status',  () => {
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('when error, uses error data',  () => {
      expect(res.json).toHaveBeenCalledWith('error');
    });
  });

  describe('when non-http error', () => {
    let error;

    beforeEach( () => {
      req.httpClient = jest.fn().mockImplementation(() => { 
        throw new Error('other error');
      });
      route(req, res);
    });

    it('uses error status',  () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('when error, uses error data',  () => {
      expect(res.json).toHaveBeenCalledWith({ error: 'other error' });
    });
  });

  describe('when successful', () => {
    beforeEach( () => {
      route(req, res);
    });

    it('uses response status',  () => {
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('uses response data',  () => {
      expect(res.json).toHaveBeenCalledWith('data');
    });
  });
});
