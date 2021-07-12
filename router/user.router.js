const express = require('express')
const router = express.Router();
const userController = require('../controller/user.controller')
const validation = require('../validation/users.validation')
const checking = require('../middleware/checkAuth')
const { validate } = require('express-validation')

router.post('/', validate(validation.loginValidation),userController.login)
router.post('/register', validate(validation.registerValidation), userController.register)
router.get('/me', userController.verifyToken)
router.post('/change', checking.checking, userController.change)
router.get('/logout', userController.logout)

module.exports = router