const { withoutErrors } = require('../../middleware');
const { NotAcceptable } = require('rest-api-errors');
const { PASSWORD } = require('../../utils/regexes');

const signUp = ({ User }) => (req, res, next) => {
  const { email, password, fullName } = req.body;

  if (!PASSWORD.test(password)) {
    return next(new NotAcceptable(406, 'Password is in wrong format.'));
  }

  const user = new User({
    email: email,
    profile: {
      fullName,
    },
  });

  User.register(user, password,
    withoutErrors(next, () => next()));
};

module.exports = signUp;
