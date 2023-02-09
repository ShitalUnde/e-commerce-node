
const express = require('express')
const router  = express.Router()

const {createUser, getAllUsers, loginUserCtrl, getUserById, deleteUserById, updateUserById, blockUserById, unblockUserById, handleRefreshToken, deleteAllUsers, logout} = require('../controller/userCtrl')
const {authHandler, isAdmin} = require('../middlewares/auth')

router.post('/register',createUser)
router.post('/login',loginUserCtrl)

router.get('/logout',logout)
router.get('/refreshToken', handleRefreshToken)
router.get('/users',authHandler,getAllUsers)

router.get('/:id', authHandler, isAdmin, getUserById)


router.put('/block-user/:id', authHandler, isAdmin, blockUserById)
router.put('/unblock-user/:id', authHandler, isAdmin, unblockUserById)
router.put('/edit-user',authHandler, updateUserById)

router.delete('/delete/:id',authHandler,deleteUserById)
router.delete('/deleteAll',authHandler, deleteAllUsers)


/*  note - non authorized method should be on top of Authorized method 
  Id  related api should to bottom based on its method type (get,post,put,delete,...) */

module.exports = router
