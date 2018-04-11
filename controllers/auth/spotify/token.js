module.exports = async function (req, res, next) {
  let response;
  
  if (!req.session.code) {
    res.status(401)
    return res.json({ error: 'no authorisation code' });
  };

  try {
    response = await req.httpClient({
      method: 'post',
      url: req.provider.tokenURI,
      data: {
        grant_type: 'authorization_code',
        code: req.session && req.session.code,
        redirect_uri: req.provider.redirectURI,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': req.provider.bearerBase64,
      },
    });
  }
  catch (error) {
    response = error.response || {
      status: 500,
      data: {
        error: error.message
      }
    };
  };

  res.status(response.status);
  return res.json(response.data);
};
