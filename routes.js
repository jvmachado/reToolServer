//controllers/routes.js
var express = require('express');
var indicatorController = require('./controller/indicators');
var deviceController = require('./controller/devices');
var router = express.Router();

router.get('/last20',indicatorController.findLast20Registers);
router.post('/device',deviceController.storeDevices);
router.get('/device',deviceController.getDevices);

module.exports = router;
