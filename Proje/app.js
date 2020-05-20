const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const curerRouter = require('./routes/curer');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/curer', curerRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на : ${port}`);
});
