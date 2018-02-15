const _ = require('lodash');
const { sendOne } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');

const signIn = ({ User }) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { email } = req.body;
    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    _.extend(user, {
      email: email,
    });

    await user.save();
    return sendOne(res, { user });

  } catch (error) {
    next(error);
  }
};

module.exports = signIn;
