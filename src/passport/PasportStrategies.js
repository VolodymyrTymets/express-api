const _ = require('lodash');
const { Unauthorized } = require('rest-api-errors');

/**
 * Provide passport authenticate strategies
 *
 *   here you should register your strategies callbacks to create ne user
 *   and use it in ./Passport.js
 *
 * **/

class PassportStrategies {
  constructor(config, User) {
    this._User = User;
    this.google = this.google.bind(this);
    this.local = this.local.bind(this);
    this.facebook = this.facebook.bind(this);
    this.instagram = this.instagram.bind(this);
  }


  local(username, password, done) {
    const error = new Unauthorized(401, 'Incorrect username or password.');
    this._User.findOne({ email: username })
      .then(user => user
        ? user.authenticate(password, (err, userData) =>
          userData
            ? done(null, user)
            : done(error, false))
        : done(error, false))
      .catch(done);
  }
  // extend if needed
  google(accessToken, refreshToken, profile, done) {

  }

  facebook(accessToken, refreshToken, profile, done) {

  }
  instagram(req, accessToken, refreshToken, profile, done) {

  }
}

module.exports = { PassportStrategies };