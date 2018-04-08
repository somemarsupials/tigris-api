module.exports = async function (req, res, next) {
  let authRes;

  try {
    authRes = await req.httpClient({
      method: 'post',
      url: req.provider.tokenURI,
      data: {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: req.provider.redirectURI,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': req.provider.bearerBase64,
      },
    });
  }
  catch (error) {
    authRes = error.response || {
      status: 500,
      data: { error: error.message },
    };
  };

  res.status(authRes.status);
  return res.json(authRes.data);
};
