const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { formController } = require('../controllers');
const { formValidation } = require('../validations');

const router = express.Router();

router.route('/').post(auth, validate(formValidation.createForm), formController.createForm);

router
  .route('/:formId')
  .get(auth, validate(formValidation.getForm), formController.getForm)
  .patch(auth, validate(formValidation.updateForm), formController.updateForm)
  .delete(auth, validate(formValidation.deleteForm), formController.deleteForm);

router.route('/user/:userId').get(auth, validate(formValidation.getFormsByUserId), formController.getFormsByUserId);

module.exports = router;
