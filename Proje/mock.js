const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// eslint-disable-next-line no-unused-expressions
require('dotenv').config;

mongoose.connect(
  `mongodb+srv://admin:${process.env.ADMIN_PASWORD}@cluster0-8yr2m.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
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
    // unique: true,
    // match: /^\S+@\S+\.\S+$/g
  },
  password: {
    type: String,
    required: true,
  },
});
// const orderSchema = new Schema({
//   title: String,
//   positions: Array, // [{position: burger, quantity: 2}, ...]
//   address: String,
//   comment: {
//     type: String,
//     default: ''
//   },
//   date: Date
// })
// const Order = model('Order', orderSchema)
// const user = new User({
//   name: 'Геннадий',
//   phone: 8928559009,
//   address: 'Бауманская, 10',
//   email: 'nxgen@mail.ru',
//   password: 'Gendir123'
// })
// user.save()
// const order1 = new Order({
//   title: "Заказ MacDonald's",
//   positions: [{position: 'Coca-Cola', quantity: 2}, {position: 'Bit Testy', quantity: 2}], // [{position: burger, quantity: 2}, ...]
//   address: 'Бауманская, 10',
//   comment: 'Была картошка, но я ее съел',
//   date: new Date().toLocaleDateString()
// })
// const order2 = new Order({
//   title: "Заказ KFC",
//   positions: [{position: 'Pepsi', quantity: 2}, {position: 'De Luxe', quantity: 2}], // [{position: burger, quantity: 2}, ...]
//   address: 'Бауманская, 53',
//   date: new Date().toLocaleDateString()
// })
// order1.save()
// order2.save()
module.exports = model('User', userSchema);
// module.exports = model('Order', orderSchema)
