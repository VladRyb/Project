const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  positions: {
    type: Array,
    required: true,
  }, // [{position: burger, quantity: 2}, ...]
  address: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  date: String,
  sold: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Order', orderSchema);
