const express = require('express');
const User = require('../models/userSchema');
const Curer = require('../models/curerShema');
const Order = require('../models/orderSchema');

const router = express.Router();

router.get('/curer', (req, res) => {
  res.render('profile/curer');
});

router.get('/user', (req, res) => {
  res.render('profile/user');
});

module.exports = router;
