const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { formService } = require('../services');
const APIError = require('../utils/APIError');

const createForm = catchAsync(async (req, res) => {
  const form = await formService.createForm(req.body);
  res.status(httpStatus.CREATED).send(form);
});

const getForm = catchAsync(async (req, res) => {
  const { formId } = req.params;
  const form = await formService.getFormById(formId);
  if (!form) {
    throw new APIError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(form);
});

const updateForm = catchAsync(async (req, res) => {
  const form = await formService.updateFormById(req.params.formId, req.body);
  res.send(form);
});

const deleteForm = catchAsync(async (req, res) => {
  await formService.deleteFormById(req.params.formId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getFormsByUserId = catchAsync(async (req, res) => {
  const forms = await formService.getFormsByUserId(req.params.userId);
  res.send(forms);
});

module.exports = {
  createForm,
  getForm,
  updateForm,
  deleteForm,
  getFormsByUserId,
};
