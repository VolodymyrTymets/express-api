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
  },
  // cords definition in mongo db
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [Number]
	},
});
// create def for cords
schema.index({ "location": "2dsphere" });

module.exports = { schema };