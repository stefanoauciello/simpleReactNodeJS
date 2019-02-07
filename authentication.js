const jwt = require('jsonwebtoken');

async function requiresLogin(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      req.decoded = await jwt.verify(token, 'mykey');
      return next();
    } catch (errors) {
      return res.json({
        errors,
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
}

module.exports = requiresLogin;
