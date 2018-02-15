const { sendAccepted } = require('../../middleware');

const signOut = (req, res) => {
  req.logOut();
  sendAccepted(res)();
};

module.exports = signOut;
