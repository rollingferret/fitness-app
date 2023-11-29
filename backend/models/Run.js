const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  distance: {
    type: Number,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  minutes: {
    type: Number,
    required: true
  },
  seconds: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Run', runSchema);
