const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models/user');
const { localAuth } = require('./local');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, localAuth(User)));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = { passport };
