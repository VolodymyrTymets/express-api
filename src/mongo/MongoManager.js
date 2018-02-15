const mongoose = require('mongoose');

class MongoManager {
  constructor () {

  }
  getMongoUrl() {
    return process.env.MONGODB_URI;
  }
  connect () {
    return mongoose.connect(this.getMongoUrl());
  }
}

const mongoManager = new MongoManager();

module.exports = { mongoManager };