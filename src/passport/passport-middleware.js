const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { config } = require('../../config');

const authenticate = (req, res, next) => {
  req.headers.authorization = req.headers.authorization || `Bearer ${req.query.access_token}`;
  return expressJwt({ secret:
    config.passport.secretAuthToken })(req, res, next);
};

const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, config.passport.secretAuthToken, {
    expiresIn: config.passport.tokenTime
  });
  next();
};


module.exports =  {
  authenticate,
  generateAccessToken,
};
