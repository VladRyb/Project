const express = require('express');
const Order = require('../models/orderSchema');

const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await Order.find({ bought: req.session.user._id });
  const ordersCur = await Order.find({ author: req.session.user._id });
  res.render('profile/profile', { ordersCur, orders, user: req.session.user });
});

module.exports = router;
