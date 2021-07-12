const express = require('express')
const router = express.Router();
const likeController = require('../controller/like.controller')
const checkAuth = require('../middleware/checkAuth')
const validation = require('../validation/like.validation')
const { validate } = require('express-validation')

router.post('/post', checkAuth.checking,validate(validation.like), likeController.postLike)
router.post('/un', checkAuth.checking, likeController.unlike)

module.exports = router