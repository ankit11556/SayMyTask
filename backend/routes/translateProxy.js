const express = require('express');
const router = express.Router();
const {translateProxycontroller} = require('../controllers/translateProxyController')
router.post('/translate', translateProxycontroller)

module.exports = router; 