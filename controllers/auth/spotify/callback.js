module.exports = async function (req, res, next) {

  try {
    req.session.code = req.query.code;
  }
  catch (error) {
    console.error(error);
  };

  return res.redirect(`${req.origin}/#/auth/spotify/callback`);
};

