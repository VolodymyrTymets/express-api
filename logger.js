const winston = require('winston');
require('winston-mongodb');
const { mongoManager } = require('./src/mongo/MongoManager');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.MongoDB)({ db: mongoManager.getMongoUrl() }),
  ],
});

module.exports = logger;
