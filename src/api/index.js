const express = require('express');

const { errorHandler } = require('../middleware/index');
const { User } = require('../models/user');
const { Car } = require('../models/car');

const auth = require('../controllers/auth');
const users = require('../controllers/users');
const cars = require('../controllers/cars');

const models = { User, Car };

const routersInit = config => {
  const router = express();

  router.use('/auth', auth(models, { config }));
  router.use('/users', users(models, { config }));
  router.use('/cars', cars(models, { config }));

  router.use(errorHandler);
  return router;
};

module.exports = routersInit;
