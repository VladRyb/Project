const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {
  cookiesCleaner
} = require('./middleware/auth');
const indexRouter = require('./routes/index');

const userRouter = require('./routes/user');
const curerRouter = require('./routes/curer');
const profileRouter = require('./routes/profile');

mongoose.connect(
  `mongodb+srv://admin:${process.env.admin}@cluster0-b4tiw.mongodb.net/nedones?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
const port = process.env.PORT || 3001;

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(cookiesCleaner);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/curer', curerRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на : ${port}`);
});
