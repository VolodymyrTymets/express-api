const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  data: {
    type: Buffer,
    required: [true],
  },
  mimetype: {
    type: String,
    required: [true],
    enum: ['image/gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/webp'],
  },
  name: {
    type: String,
    required: [true],
  },
  encoding: String,
});

module.exports = { schema };