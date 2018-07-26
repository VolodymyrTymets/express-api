// eslint-disable-next-line
const withUserInSession = (req, res, next) => {
  if(req.session) {
    req.session.user = req.user;
  }
  next();
};

module.exports = { withUserInSession };