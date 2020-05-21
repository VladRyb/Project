const express = require('express');
const router = express.Router();
const User = [{ email: 1234, password: 123 }];

let zakazArr = [];

router.get('/', (req, res) => {
  res.redirect('curer/login');
});

router.get('/login', (req, res) => {
  res.render('curer/login');
});

router.post('/login', async (req, res) => {
  try {
    if (User[0].password == req.body.password) {
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
router.get('/signup', (req, res) => {
  res.render('curer/signup');
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
    await user.save();

    if (user) {
      res.redirect('/curer/main');
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
  res.render('curer/zakaz');
});

router.post('/zakaz', (req, res) => {
  zakazArr.push({
    from: req.body.from,
    adres: req.body.adres,
    product: [{ product: req.body.product, quantity: req.body.quantity }],
    comment: req.body.comment,
  });
  res.render('curer/ok');
});

module.exports = router;
