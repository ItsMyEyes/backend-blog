const express = require('express')
const router = express.Router();
const guestController = require('../controller/guest.controller')

router.get('/',guestController.home)

module.exports = router