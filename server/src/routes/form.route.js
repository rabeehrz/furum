const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { formController } = require('../controllers');
const { formValidation } = require('../validations');

const router = express.Router();

router.post('/', auth, validate(formValidation.createForm), formController.createForm);

module.exports = router;
