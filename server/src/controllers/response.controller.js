const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { responseService } = require('../services');
const APIError = require('../utils/APIError');

const createResponse = catchAsync(async (req, res) => {
  const response = await responseService.createResponse(req.body);
  res.status(httpStatus.CREATED).send(response);
});

const getResponsesByFormId = catchAsync(async (req, res) => {
  const responses = await responseService.getResponsesByFormId(req.params.formId);
  res.send(responses);
});

const getResponse = catchAsync(async (req, res) => {
  const { responseId } = req.params;
  const response = await responseService.getResponseById(responseId);
  if (!response) {
    throw new APIError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

module.exports = {
  createResponse,
  getResponsesByFormId,
  getResponse,
};
