const bearerBase64 = require('../../middlewares/bearerBase64');

describe('bearerBase64 middleware', () => {
  describe('when provider not present', () => {
    it('throws error', () => {
      expect(() => bearerBase64()).toThrow(Error);
    });
  });

  describe('when provider present', () => {
    let bufferClass, buffer, req, next;

    beforeEach(() => {
      buffer = { toString: jest.fn().mockReturnValue('base64creds') };
      bufferClass = jest.fn().mockReturnValue(buffer);
      req = {
        provider: {
          clientId: 'id',
          secret: 'secret',
        },
      };
      next = jest.fn();
      bearerBase64(req, null, next, bufferClass);
    });

    it('creates buffer', () => {
      expect(bufferClass).toHaveBeenCalledWith('id:secret');
    });

    it('encodes in base64', () => {
      expect(buffer.toString).toHaveBeenCalledWith('base64');
    });

    it('populates request with base64 encoded credentials', () => {
      expect(req.provider.bearerBase64).toEqual('Basic base64creds');
    });

    it('calls next', () => {
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
