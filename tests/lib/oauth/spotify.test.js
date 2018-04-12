const spotify = require('../../../lib/oauth/clients').spotify;
const errors = require('../../../lib/errors');

describe('SpotifyOAuthClient', () => {
  let client, env;

  beforeEach(() => {
    env = {
      providers: {
        spotify: {
          clientId: 0,
          authoriseURI: 'auth.com',
          callbackURI: 'callback.com',
          redirect_uri: 'uri',
          secret: 'secret',
        },
      },
    };
    client = spotify(env)
  });

  describe('#authorise', () => {
    let req, res;

    beforeEach(() => {
      req = {
        origin: 'site.com',
        session: { id: 1 },
      };
      res = { redirect: jest.fn() };
      client.authorise(req, res);
    });

    it('redirects correctly', () => {
      expect(res.redirect.mock.calls).toMatchSnapshot();
    });

    it('calls redirect once', () => {
      expect(res.redirect).toHaveBeenCalledTimes(1);
    });
  });

  describe('#token', () => {
    let auth;

    beforeEach(() => {
      auth = {
        status: 200,
        data: 'data'
      };
      req = {
        body: {
          callback: 'callback',
        },
        httpClient: jest.fn().mockReturnValue(auth),
        session: { code: 'code' },
      };
      res = { 
        status: jest.fn(),
        json: jest.fn()
      };
      client._bearer = jest.fn().mockReturnValue('credentials');
    });

    describe('when making API request', () => {
      beforeEach(() => {
        client.token(req, res);
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
        client.token(req, res);
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
        client.token(req, res);
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
        client.token(req, res);
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
        client.token(req, res);
      });

      it('uses response status',  () => {
        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('uses response data',  () => {
        expect(res.json).toHaveBeenCalledWith('data');
      });
    });
  });

  describe('#_bearer', () => {
    let bufferClass, buffer, req, returnValue;

    beforeEach(() => {
      buffer = { toString: jest.fn().mockReturnValue('base64creds') };
      bufferClass = jest.fn().mockReturnValue(buffer);
      req = {
        provider: {
          clientId: 'id',
          secret: 'secret',
        },
      };
      returnValue = client._bearer(bufferClass);
    });

    it('creates buffer', () => {
      expect(bufferClass).toHaveBeenCalledWith('0:secret');
    });

    it('encodes in base64', () => {
      expect(buffer.toString).toHaveBeenCalledWith('base64');
    });

    it('populates request with base64 encoded credentials', () => {
      expect(returnValue).toEqual('Basic base64creds');
    });
  });
});
