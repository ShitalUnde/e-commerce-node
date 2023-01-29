
const express = require('express')
const {createUser, getAllUsers, loginUserCtrl, getUserById, deleteUserById, updateUserById} = require('../controller/userCtrl')
const {authHandler} = require('../middlewares/auth')
const router  = express.Router()

router.post('/register',createUser)
router.get('/users',getAllUsers)
router.post('/login',loginUserCtrl)
router.get('/:id', authHandler, getUserById)
router.delete('/:id',deleteUserById)
router.put('/:id',updateUserById)




module.exports = router
