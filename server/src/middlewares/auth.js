const httpStatus = require('http-status');
const { tokenService, userService } = require('../services');
const APIError = require('../utils/APIError');

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const [token] = req.headers.authorization.split(' ').slice(-1);
      const { sub } = tokenService.verifyToken(token);
      const user = await userService.getUserById(sub);
      if (!user) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'User unavaliable');
      }
      req.user = user;
      return next();
    }
  } catch (error) {
    return next(error);
  }
  return next(new APIError(httpStatus.UNAUTHORIZED, 'Please authenticate!'));
};

module.exports = auth;
