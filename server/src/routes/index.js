const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.route.js'));
router.use('/form', require('./form.route.js'));
router.use('/response', require('./response.route.js'));

module.exports = router;
