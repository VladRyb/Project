const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const curerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
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

module.exports = model('Curer', curerSchema);
