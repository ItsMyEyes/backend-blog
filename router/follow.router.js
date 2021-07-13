const express = require('express')
const router = express.Router();
const followController = require('../controller/follow.controller')
const checkAuth = require('../middleware/checkAuth')
const validation = require('../validation/follow.validation')
const { validate } = require('express-validation')

router.post('/', checkAuth.checking, validate(validation.follow) , followController.following)
router.post('/destroy', checkAuth.checking, validate(validation.follow) , followController.unfollow)

module.exports = router