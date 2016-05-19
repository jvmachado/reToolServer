//controllers/routes.js
var express = require('express');
var indicatorController = require('./controller/indicators');
var router = express.Router();

router.get('/last20',indicatorController.findLast20Registers);
module.exports = router;