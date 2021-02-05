const httpStatus = require('http-status');
const { Response } = require('../models');
const userService = require('./user.service');
const formService = require('./form.service');
const APIError = require('../utils/APIError');
const isEmail = require('../utils/isEmail');
const isNumeric = require('../utils/isNumeric');

const validateResponse = (form, responses) => {
  const { questions } = form;
  const keyedResponse = {};
  responses.forEach((response) => {
    // validate response id
    keyedResponse[response.questionId] = {
      data: response.data,
    };
  });
  questions.forEach((question) => {
    const response = keyedResponse[question.id];
    if (!response && question.required) {
      throw new APIError(httpStatus.BAD_REQUEST, `Question ${question.id} is required`);
    }
    switch (question.type) {
      case 'text':
        if (!response.data.text) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid input for ${question.id}`);
        }
        break;
      case 'email':
        if (!response.data.text) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid input for ${question.id}`);
        }
        if (!isEmail(response.data.text)) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid email for ${question.id}`);
        }
        break;
      case 'number':
        if (!response.data.text) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid input for ${question.id}`);
        }
        if (!isNumeric(response.data.text)) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid number for ${question.id}`);
        }
        break;
      case 'select':
      case 'radio':
        if (!response.data.text) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid input for ${question.id}`);
        }
        if (!question.data.options.includes(response.data.text)) {
          throw new APIError(httpStatus.BAD_REQUEST, `Selection invalid for ${question.id}`);
        }
        break;
      case 'checkbox':
        if (!response.data.choices) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid input for ${question.id}`);
        }
        if (!response.data.choices.every((option) => question.data.options.includes(option))) {
          throw new APIError(httpStatus.BAD_REQUEST, `Multi selection invalid for ${question.id}`);
        }
        break;
      default:
        throw new APIError(httpStatus.BAD_REQUEST, `Invalid response type ${question.type}`);
    }
  });
};

const createResponse = async (responseBody) => {
  const user = await userService.getUserById(responseBody.userId);
  const form = await formService.getFormById(responseBody.formId);
  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!form) {
    throw new APIError(httpStatus.NOT_FOUND, 'Form not found');
  }
  validateResponse(form, responseBody.responses);
  const response = await Response.create(responseBody);
  return response;
};

const getResponsesByFormId = async (formId) => {
  const form = await formService.getFormById(formId);
  if (!form) {
    throw new APIError(httpStatus.NOT_FOUND, 'Form not found');
  }
  const responses = await Response.find({ formId });
  return responses;
};

const getResponseById = async (id) => Response.findById(id);

module.exports = {
  createResponse,
  validateResponse,
  getResponsesByFormId,
  getResponseById,
};
