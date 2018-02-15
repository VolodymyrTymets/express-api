const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { schema } = require('./schema');

schema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const User = mongoose.model('User', schema);
module.exports = { User };