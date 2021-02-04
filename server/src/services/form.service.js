const httpStatus = require('http-status');
const { User, Form } = require('../models');
const APIError = require('../utils/APIError');

const validateQuestions = (questions) => {
  questions.forEach((question) => {
    const { type, data } = question;
    switch (type) {
      case 'text':
      case 'email':
      case 'number':
        break;
      case 'select':
      case 'radio':
      case 'checkbox':
        if (!data || !data.options) {
          throw new APIError(httpStatus.BAD_REQUEST, `No valid options provided for type ${type}`);
        }
        break;
      default:
        throw new APIError(httpStatus.BAD_REQUEST, `Invalid question type ${type}`);
    }
  });
};

const createForm = async (formBody) => {
  const form = await Form.create(formBody);
  return form;
};
module.exports = {
  createForm,
  validateQuestions,
};
