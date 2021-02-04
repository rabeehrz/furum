const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.route.js'));
router.use('/form', require('./form.route.js'));

module.exports = router;
