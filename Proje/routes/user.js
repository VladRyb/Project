const express = require('express');
const router = express.Router();
// const User = require('../mock');
const user = { name: 'Admin', password: '123' };
const usersArr = [];

router.get('/', (req, res) => {
  res.redirect('user/login');
});

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  try {
    // const user = await User.findOne({
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    console.log(req.body.password);
    if (user.password == req.body.password) {
      res.redirect('/user/main'); //'http://localhost:3000/user/main'
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

router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.post('/signup', async (req, res) => {
  try {
    // const user = new User({
    //   name: req.body.name,
    //   phone: req.body.phone,
    //   address: req.body.address,
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    let previousLength = usersArr;
    usersArr.push({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
    });
    // await user.save();

    if (usersArr.length > previousLength) {
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
  res.render('user/main');
});

module.exports = router;
