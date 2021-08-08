const express = require('express');
const router = express.Router();
const controller = require('../controller/user');

router.post('/',controller.user)

module.exports = router;