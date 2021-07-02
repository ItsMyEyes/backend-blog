const express = require('express')
const router = express.Router();
const postsController = require('../controller/post.controller')
const checkAuth = require('../middleware/checkAuth')
const validation = require('../validation/posts.validation')
const { validate } = require('express-validation')

router.get('/all', checkAuth.checking, postsController.getPosting)
router.get('/getAll', postsController.all);
router.post('/create', checkAuth.checking, validate(validation.post), postsController.createPosting)
router.get('/detail', checkAuth.checking, postsController.detail)
router.get('/detailBlog', postsController.detailBlog)
router.put('/edit', checkAuth.checking, validate(validation.post), postsController.editPosting)
router.post('/category/create', checkAuth.checking, postsController.createPostingCategory)
router.delete('/destroy', checkAuth.checking, postsController.deletePosting)
router.post('/uploads', checkAuth.checking, postsController.upload)

module.exports = router