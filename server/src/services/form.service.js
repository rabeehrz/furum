const httpStatus = require('http-status');
const { Form } = require('../models');
const userService = require('./user.service');
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
  const user = await userService.getUserById(formBody.userId);
  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User not found');
  }
  validateQuestions(formBody.questions);
  const form = await Form.create(formBody);
  return form;
};

const getFormById = async (id) => Form.findById(id);

const updateFormById = async (formId, updateBody) => {
  const form = await getFormById(formId);
  if (!form) {
    throw new APIError(httpStatus.NOT_FOUND, 'Form not found');
  }
  if (updateBody.userId) {
    const user = await userService.getUserById(updateBody.userId);
    if (!user) {
      throw new APIError(httpStatus.NOT_FOUND, 'User not found');
    }
  }
  validateQuestions(updateBody.questions);
  Object.assign(form, updateBody);
  await form.save();
  return form;
};

const deleteFormById = async (formId) => {
  const form = await getFormById(formId);
  if (!form) {
    throw new APIError(httpStatus.NOT_FOUND, 'Form not found');
  }
  await form.remove();
  return form;
};

const getFormsByUserId = async (userId) => {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User not found');
  }
  const forms = await Form.find({ userId });
  return forms;
};

module.exports = {
  createForm,
  validateQuestions,
  getFormById,
  updateFormById,
  deleteFormById,
  getFormsByUserId,
};
