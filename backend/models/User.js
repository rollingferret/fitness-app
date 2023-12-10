const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: false
    },
    dob: {
      type: Date,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    image: {
      type: Buffer,
      required: false
    },
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
