const httpStatus = require('http-status');
const { User } = require('../models');
const APIError = require('../utils/APIError');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  createUser,
};
