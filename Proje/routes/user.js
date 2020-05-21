const express = require('express');
const router = express.Router();
// const User = require('../mock');
const user = {
  name: 'Дима',
  phone: 89161231212,
  email: 'd@mail.ru',
  password: '123'
};
const usersArr = [];
const orders = [{
    id: '321',
    title: "Заказ MacDonald's",
    positions: [{
      position: 'Coca-Cola',
      quantity: 2
    }, {
      position: 'Bit Testy',
      quantity: 2
    }], // [{position: burger, quantity: 2}, ...]
    price: '300 руб',
    address: 'Бауманская, 10',
    comment: 'Была картошка, но я ее съел',
    date: new Date().toLocaleDateString()
  },
  {
    id: '123',
    title: "Заказ KFC",
    positions: [{
      position: 'Pepsi',
      quantity: 2
    }, {
      position: 'De Luxe',
      quantity: 2
    }], // [{position: burger, quantity: 2}, ...]
    price: '250 руб',
    address: 'Бауманская, 53',
    date: new Date().toLocaleDateString()
  }
]
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
    let previousLength = usersArr.length;
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
  // console.log(orders)
  res.render('user/main', {
    user: user,
    orders: orders
  });
});

router.get('/show-details/:id', async (req, res) => {
  console.log(req.params.id)
  const order = orders.find(order => order.id == req.params.id)
  res.render('user/show', order)
});

module.exports = router;
