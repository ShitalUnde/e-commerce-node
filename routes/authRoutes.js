
const express = require('express')
const {createUser, getAllUsers, loginUserCtrl, getUserById, deleteUserById, updateUserById, blockUserById, unblockUserById, handleRefreshToken} = require('../controller/userCtrl')
const {authHandler, isAdmin} = require('../middlewares/auth')
const router  = express.Router()

router.post('/register',createUser)
router.get('/users',getAllUsers)
router.post('/login',loginUserCtrl)

router.get('/refreshToken', handleRefreshToken)

router.get('/:id', authHandler, isAdmin, getUserById)
router.delete('/:id',deleteUserById)
// router.put('/:id', updateUserById)

router.put('/block-user/:id', authHandler, isAdmin, blockUserById)
router.put('/unblock-user/:id', authHandler, isAdmin, unblockUserById)

router.put('/edit-user',authHandler, updateUserById)




module.exports = router
