const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const APIError = require('./utils/APIError');

const app = express();

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log('Connection Successful');
  })
  .catch((err) => {
    console.log('An error occured', err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req, res, next) => {
  next(new APIError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
