module.exports = function (req, res, next, buffer = Buffer) {
  if (!req.provider) {
    throw new Error('base64 authorisation needs provider');
  };

  let { clientId, secret } = req.provider;
  let credentials = buffer(`${clientId}:${secret}`);
  req.provider.bearerBase64 = `Basic ${credentials.toString('base64')}`;

  next();
};
