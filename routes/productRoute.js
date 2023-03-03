const express = require('express')
const router = express.Router()
const {createProduct, getProductById, getAllProduct, updateProduct, deleteProduct} = require('../controller/productCtrl')
const { authHandler, isAdmin } = require('../middlewares/auth')


router.post('/create-product', authHandler,isAdmin, createProduct)
router.get('/getAllProduct', authHandler,isAdmin, getAllProduct)
router.get('/:id', authHandler,isAdmin, getProductById)

router.put('/:id', authHandler,isAdmin, updateProduct)
router.delete('/:id', authHandler,isAdmin, deleteProduct)


/* 
IMP*

 
diff bet PUT & PATCH
put is used to replace full Object
wehere as , Patch is used to update specific value only*/

module.exports = router