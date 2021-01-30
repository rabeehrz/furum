const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

const app = express();

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log('Connection Successful');
  })
  .catch((err) => {
    console.log('An error occured', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// Error Handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Adich poyi!');
});

module.exports = app;
