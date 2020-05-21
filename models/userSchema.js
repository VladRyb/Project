const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model('User', userSchema);
