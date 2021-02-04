const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, formService } = require('../services');
const APIError = require('../utils/APIError');

const createForm = catchAsync(async (req, res) => {
  const { userId, questions } = req.body;
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new APIError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }
  formService.validateQuestions(questions);
  const form = await formService.createForm(req.body);
  res.status(httpStatus.CREATED).send(form);
});

module.exports = {
  createForm,
};
