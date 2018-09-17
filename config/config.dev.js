const path = require('path');

module.exports = {
  bodyLimit: '100kb',
  passport: {
    tokenTime: 2592000, // 60*60*24*30 -> 30 days
    secretAuthToken: process.env.SECRET_TOKEN,
    resetPasswordExpires: 3600000 * 24, // 24 hour
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || '*',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '*',
    },
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID || '*',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '*',
    },
    instagram: {
      clientID: process.env.INSTAGRAM_CLIENT_ID || '*',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '*',
      callbackURL: process.env.INSTAGRAM_CLIENT_CALLBACK_URL,
      passReqToCallback: true,
    }
  }
  },
	swaggerDirPath: path.resolve(__dirname, '../swagger/'),
  swaggerFilePath: path.resolve(__dirname, '../swagger/swagger.dev.yaml'),
};
