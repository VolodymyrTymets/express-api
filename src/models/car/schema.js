const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: [true],
  },
  manufacture: {
    type: String,
    required: [true],
  },
  model: {
    type: String,
    required: [true],
  },
  connectors: [{
    type: String,
    required: [true],
    enum: ['Type2', 'CCS']
  }],
  batteryCapacity: {
    type: Number,
    required: [true],
  },
  transform: {
    type: String,
    required: [true],
  }
});

module.exports = { schema };