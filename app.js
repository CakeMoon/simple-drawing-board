const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

// import all the express routes we will be using
// const indexRouter = require('./routes/index');


// create app
const app = express();

// set up user session
app.use(session({
    secret: 'Freet',
    resave: true,
    saveUninitialized: true
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect url hierarchies to our routers
// app.use('/', indexRouter);

module.exports = app;
