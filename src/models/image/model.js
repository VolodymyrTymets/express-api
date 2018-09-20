const mongoose = require('mongoose');
const { schema } = require('./schema');

const Image = mongoose.model('Image', schema);
module.exports = { Image };