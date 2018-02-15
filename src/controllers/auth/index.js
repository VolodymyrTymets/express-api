const { Router: router } = require('express');
const { authenticate, generateAccessToken } = require('../../middleware');
const passport = require('passport');
const signIn = require('./sign-in');
const signUp = require('./sign-up');
const signOut = require('./sign-out');
const changePassword = require('./change-password');

/**
 * Provide Api for Auth

 POST /api/v1/auth/sign-in - Sign In
 @params
       email {string}
       password {string}

 POST /api/v1/auth/sign-up - Sign Un
 @params
       email {string}
       password {string}

 POST /api/v1/auth/sign-out - Sign Out
 @header
        Authorization: Bearer {token}

 POST /api/v1/auth/change-password - Change Password
 @header
       Authorization: Bearer {token}
 @params
       newPassword {string}
       password {string}


 **/

module.exports = (models, { config }) => {
  const api = router();

  api.post('/sign-in',
    passport.authenticate('local', { session: false, scope: [] }),
    generateAccessToken,
    signIn);

  api.post('/sign-up', signUp(models, { config }),
    passport.authenticate('local', { session: false, scope: [] }),
    generateAccessToken,
    signIn);

  api.post('/sign-out', authenticate, signOut);

  api.put('/change-password', authenticate, changePassword(models));

  return api;
};
