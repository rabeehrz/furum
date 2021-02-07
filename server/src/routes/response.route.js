const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { responseController } = require('../controllers');
const { responseValidation } = require('../validations');

const router = express.Router();

router.route('/').post(validate(responseValidation.createResponse), responseController.createResponse);

router.route('/:responseId').get(auth, validate(responseValidation.getResponse), responseController.getResponse);

router
  .route('/form/:formId')
  .get(auth, validate(responseValidation.getResponsesByFormId), responseController.getResponsesByFormId);

// router
//   .route('/:formId')
//   .get(auth, validate(formValidation.getForm), formController.getForm)
//   .patch(auth, validate(formValidation.updateForm), formController.updateForm)
//   .delete(auth, validate(formValidation.deleteForm), formController.deleteForm);

// router.route('/user/:userId').get(auth, validate(formValidation.getFormsByUserId), formController.getFormsByUserId);

module.exports = router;
