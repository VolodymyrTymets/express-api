const mongoose = require('mongoose');
const { schema } = require('./schema');
const Car = mongoose.model('Car', schema);

module.exports = { Car };