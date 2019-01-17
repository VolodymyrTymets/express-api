const mongoose = require('mongoose');
const { schema } = require('./schema');
const { fieldToSearch } = require('../../utils/mongo');

schema.methods.fieldsToSearch = search => [
  'model'
].map(fieldToSearch(search));

const Car = mongoose.model('Car', schema);
module.exports = { Car };