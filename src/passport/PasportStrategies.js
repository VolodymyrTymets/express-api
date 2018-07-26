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
    this._findOrCreateUser = this._findOrCreateUser.bind(this);
  }


  async _mergeByEmail(email, servicesName, service) {
    const User = this._User;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return null;
      }
      _.extend(user.services, { [servicesName]: service });
      const saved = await user.save();
      return saved;
    } catch (error) {
      throw error;
    }
  }
  async _findOrCreateUser(selector, serviceName, newUser, connectionField) {
    let user = null;
    // 1. Check if user with this email already exist
    user = await this._mergeByEmail(
      newUser.email, serviceName , newUser.services[serviceName]);

    if(!user) {
      // 2. Check if user with this services exists
      user = await this._User.findOne(selector);
      if (!user) {
        // if not create new one user
        user = await new this._User(newUser).save();
        user.isNew = true;
      }
    }
    return user;
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

  async google(accessToken, refreshToken, profile, done) {
    const newUser = {
      email: _.get(profile, 'emails.0.value'),
      profile: {
        fullName: _.get(profile, 'displayName'),
        avatar: _.get(profile, '_json.picture'),
      },
      services: {
        google: {
          accessToken,
          refreshToken,
          id: profile.id,
        }
      }
    };
    const connection = {
      type: 'google',
      name: 'Google',
      value: _.get(profile, 'emails.0.value'),
    };
    try {
      const saved = await this._findOrCreateUser(
        { 'services.google.id': profile.id }, 'google', newUser, connection);
      return done(null, saved);
    } catch (error) {
      done(error);
    }
  }

  async facebook(accessToken, refreshToken, profile, done) {
    const newUser = {
      email: _.get(profile, 'emails.0.value'),
      profile: {
        fullName: _.get(profile, 'displayName'),
        avatar: _.get(profile, 'photos.0.value'),
      },
      services: {
        facebook: {
          accessToken,
          refreshToken,
          id: profile.id,
        }
      }
    };
    const connection = {
      type: 'facebook',
      name: 'Facebook',
      value: `https://www.facebook.com/${_.get(profile, '_json.first_name')}.${_.get(profile, '_json.last_name')}`,
    };
    try {
      const saved = await this._findOrCreateUser(
        { 'services.facebook.id': profile.id }, 'facebook', newUser, connection);
      return done(null, saved);
    } catch (error) {
      done(error);
    }
  }
  async instagram(req, accessToken, refreshToken, profile, done) {
    const serviceName = 'instagram';
    const service = {
      accessToken,
      refreshToken,
      id: profile.id,
    };

    const connection = {
      type: serviceName,
      name: 'Instagram',
      value: `https://www.instagram.com/${_.get(profile, 'username')}/`,
    };

    try {
      const userId = _.get(req.session, 'user.id');
      const user = await this._User.findOne({ _id: userId });
      if(user){
        user.services = user.services || {};
        _.extend(user.services, { [serviceName]: service });
        await user.save();
        return done(null, user);
      }
      return done(new Unauthorized(401, 'User not found.'));
    } catch (error) {
      done(error);
    }
  }
}

module.exports = { PassportStrategies };