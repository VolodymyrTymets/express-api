const passportNPM = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
// const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
// const { Strategy: InstagramStrategy } = require('passport-instagram');
// const FacebookTokenStrategy = require('passport-facebook-token');
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

    // todo use if need it
    // this._passport.use(new GoogleTokenStrategy(
    //   config.passport.google, this._strategies.google));
    //
    // this._passport.use(new FacebookTokenStrategy(
    //   config.passport.facebook, this._strategies.facebook));
    // this._passport.use(new InstagramStrategy(
    //   config.passport.instagram, this._strategies.instagram));
  }

  init() {
    this._passport.serializeUser(User.serializeUser());
    this._passport.deserializeUser(User.deserializeUser());

    return this._passport.initialize();
  }
}

const passport = new Passport(config);

module.exports = { passport };