const express = require('express')
const router = express.Router();
const categoryController = require('../controller/category.controller')
const checkAuth = require('../middleware/checkAuth')
const validation = require('../validation/category.validation')
const { validate } = require('express-validation')

router.get('/all', checkAuth.checking, categoryController.getCategory)
router.get('/getAll', categoryController.all);
router.post('/create', checkAuth.checking, validate(validation.post), categoryController.createCategory)
router.get('/detail', checkAuth.checking, categoryController.detail)
router.put('/edit', checkAuth.checking, validate(validation.post), categoryController.editCategory)
router.delete('/destroy', checkAuth.checking, categoryController.deleteCategory)

module.exports = router