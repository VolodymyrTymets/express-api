const { sendOne } = require('../../middleware');

const signIn = (req, res) => {
  const { token, user } = req;
  return sendOne(res, { user, token});
};

module.exports = signIn;
