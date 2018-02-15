const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const bodyParser = require('body-parser');
const config = require('./config');
const api = require('./src/api/index');
const { passport } = require('./src/passport');
const { mongoManager } = require('./src/mongo');
const { onAppStart } = require('./on-start');

const app = express();
mongoManager.connect();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// Authorization
app.use(passport.initialize());



// api routes v1
app.use('/api/v1', api(config));

// on App start
//onAppStart();

module.exports = app;
