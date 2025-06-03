const express = require('express');
const { receiveReceipt } = require('../controllers/deliveryController');
const router = express.Router();

router.post('/receipt', receiveReceipt);

module.exports = router;