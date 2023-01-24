
const express = require('express')
const {createUser, getUser, loginUserCtrl} = require('../controller/userCtrl')

const router  = express.Router()

router.post('/register',createUser)
router.get('/users',getUser)
router.post('/login',loginUserCtrl)


module.exports = router
