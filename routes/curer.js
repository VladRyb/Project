const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const Curer = require('../models/curerShema');
const Order = require('../models/orderSchema');
const { sessionCheckerCurer } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.redirect('curer/login');
});

router.get('/login', sessionCheckerCurer, (req, res) => {
  res.render('curer/login');
});

router.post('/login', async (req, res) => {
  try {
    const curer = await Curer.findOne({
      email: req.body.email,
    });

    if (curer && (await bcrypt.compare(req.body.password, curer.password))) {
      req.session.user = curer;
      res.redirect('/curer/zakaz');
    } else {
      throw error;
    }
  } catch (error) {
    res.render('curer/login', {
      error,
      status: 'Неверный логин или пароль',
    });
  }
});

router.get('/signup', sessionCheckerCurer, (req, res) => {
  res.render('curer/signup');
});

router.post('/signup', async (req, res) => {
  try {
    const curer = new Curer({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    req.session.user = curer;
    await curer.save();

    if (curer) {
      res.redirect('/curer/zakaz');
    } else {
      throw error;
    }
  } catch (error) {
    res.render('curer/signup', {
      error,
      status: 'Ошибка, корректно заполните все поля',
    });
  }
});

router.get('/zakaz', (req, res) => {
  res.render('curer/zakaz', { user: req.session.user });
});

router.post('/zakaz', async (req, res) => {
  const order = new Order({
    title: req.body.from,
    address: req.body.adres,
    author: req.session.user._id,
    positions: [],
    comment: req.body.comment,
    date: new Date(),
  });
  if (typeof req.body.product == 'string') {
    order.positions.push({
      product: req.body.product,
      quantity: req.body.quantity,
    });
  } else {
    for (let i = 0; i < req.body.product.length; i += 1) {
      order.positions.push({
        product: req.body.product[i],
        quantity: req.body.quantity[i],
      });
    }
  }
  await order.save();

  setTimeout(() => {
    res.redirect('/');
  }, 4000);
});

router.get('/ok', (req, res) => {
  res.render('curer/ok');
});

module.exports = router;
