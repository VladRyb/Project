const express = require('express');

const router = express.Router();
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/userSchema');
const Order = require('../models/orderSchema');

let id = 0;
// const saltRounds = 10;

router.get('/', (req, res) => {
  res.redirect('/user/login');
});

router.get('/login', sessionChecker, (req, res) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
      // password: await bcrypt.hash(req.body.password, saltRounds)
    });
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   req.session.user = user;
    //   res.redirect('/user/main');
    // } else {
    //   res.redirect('/login');
    // }
    if (user) {
      req.session.user = user;
      res.redirect('/user/main'); // 'http://localhost:3000/user/main'
    } else {
      throw error;
    }
  } catch (error) {
    res.render('user/login', {
      error,
      status: 'Неверный логин или пароль',
    });
  }
});

router.get('/signup', sessionChecker, (req, res) => {
  res.render('user/signup');
});

router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.user = user;

    await user.save();

    if (user) {
      res.redirect('/user/main');
    } else {
      throw error;
    }
  } catch (error) {
    res.render('user/signup', {
      error,
      status: 'Ошибка, корректно заполните все поля',
    });
  }
});

router.get('/main', async (req, res) => {
  const orders = await Order.find();
  res.render('user/main', { orders, user: req.session.user });
});

router.get('/show-details/:id', async (req, res) => {
  id = req.params.id;
  const order = await Order.findById({ _id: req.params.id });
  res.render('user/show', { order });
});

router.get('/show-old-details/:id', async (req, res) => {
  id = req.params.id;
  const order = await Order.findById({ _id: req.params.id });
  res.render('user/show_old', order);
});

router.get('/confirm/', (req, res) => {
  if (req.session.user) {
    res.render('user/confirm', { user: req.session.user });
  }
});
router.post('/confirm/', async (req, res, next) => {
  await Order.updateOne({ _id: id }, { sold: true, bought: req.session.user });
  res.redirect('/user/main');
});

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/');
  }
});
module.exports = router;
