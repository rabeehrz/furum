const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService, authService } = require('../services');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmail(email, password);
  const token = await tokenService.generateToken(user.id);
  res.send({ user, token });
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateToken(user.id);
  res.status(httpStatus.CREATED).send({ user, token });
});

module.exports = {
  login,
  register,
};
