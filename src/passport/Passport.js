const passportNPM = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models/user');
const { PassportStrategies } = require('./PasportStrategies');
const config = require('../../config');

/**
 * Provide passport authenticate logic
 *
 *  @example
 *         ./index.js
 *         app.use(passport.init())
 * **/

class Passport {
  constructor(config) {
    this._passport = passportNPM;
    this._strategies = new PassportStrategies(config, User);

    this._passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, this._strategies.local));
  }

  init() {
    this._passport.serializeUser(User.serializeUser());
    this._passport.deserializeUser(User.deserializeUser());

    return this._passport.initialize();
  }
}

const passport = new Passport(config);

module.exports = { passport };