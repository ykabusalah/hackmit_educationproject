let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('cookie-session');

let app = express();
let routes = require("./routes");

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  name: 'session',
  secret: 'nadia on mouse',

  // Cookie Options
  maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  secure: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route Handling
app.use('/', routes);

module.exports = app;
