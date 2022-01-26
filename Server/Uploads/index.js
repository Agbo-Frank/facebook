const { Router } = require('express')
const { authenticate } = require('../utils/aithenticate')
const { createPost } = require('./postUpload')
const { editUser } = require('./userUpload')
const router = Router()

router.post('/product', authenticate, createPost)

router.post('/user', authenticate, editUser)

module.exports = router