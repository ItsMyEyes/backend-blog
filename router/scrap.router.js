const express = require('express')
const router = express.Router();
const scrapController = require('../controller/scrap.controller')

router.get('/browser', scrapController.browser)

module.exports = router