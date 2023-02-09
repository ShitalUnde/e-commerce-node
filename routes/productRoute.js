const express = require('express')
const router = express.Router()
const {createProduct, getProductById, getAllProduct} = require('../controller/productCtrl')
const { authHandler, isAdmin } = require('../middlewares/auth')


router.post('/create-product', authHandler,isAdmin, createProduct)
router.get('/getAllProduct', authHandler,isAdmin, getAllProduct)
router.get('/find-by-id/:id', authHandler,isAdmin, getProductById)


module.exports = router