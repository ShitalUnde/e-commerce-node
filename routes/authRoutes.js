
const express = require('express')
const {createUser, getUser} = require('../controller/userCtrl')

const router  = express.Router()

router.post('/register',createUser)
router.get('/users',getUser)

module.exports = router
