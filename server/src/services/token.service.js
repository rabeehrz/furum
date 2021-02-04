const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config');

// TODO: CHANGE JWT ALGORITHM

const { secret } = config.jwt;

const generateToken = (userId) => {
  const expires = moment().add(config.jwt.accessExpires, 'days');
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyToken,
};
