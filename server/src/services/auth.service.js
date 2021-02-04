const httpStatus = require('http-status');
const userService = require('./user.service');
const APIError = require('../utils/APIError');

const loginWithEmail = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

module.exports = {
  loginWithEmail,
};
