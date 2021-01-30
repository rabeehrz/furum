const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const login = catchAsync(async (req, res) => {
  res.json({
    success: true,
    path: '/login',
  });
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  const token = 'seCrETBooOoOOHhh!';
  res.status(httpStatus.CREATED).send({ user, token });
});

module.exports = {
  login,
  register,
};
