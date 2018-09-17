const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const projects = require('./routes/projects');

const app = express();
mongoose.connect(process.env.MONGO_URI);

// allows CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
  next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use('/projects', projects);

// handle JsonSchemaValidationErrors
app.use((err, req, res) => {
  res.status(400);

  res.json({
    status: 'error',
    error: err,
  });
});

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 404).json({
    status: 'error',
    message: 'not found',
  });
  // res.render('error');
});

module.exports = app;
