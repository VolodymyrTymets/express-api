const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config');

const authenticate = expressJwt({ secret: process.env.SECRET_TOKEN });

const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, process.env.SECRET_TOKEN, {
    expiresIn: config.tokenTime
  });
  next();
};

// const respond = (req, res) => res.status(200).json({
//   user: req.user.username,
//   token: req.token
// });


module.exports =  {
  authenticate,
  generateAccessToken,
  // respond
};
