const User  = require('../models/userModel')
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')

const authHandler = asyncHandler(async(req,res,next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
            try{
                if(token){
                    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                    const user = await User.findById(decoded.id)
                    req.user = user;
                    next()
                }
            }
            catch(err){
                throw new Error('Not Authorized token expired')
            }
    }else {
        throw new Error('There is no token to header')
    }
})

const isAdmin = asyncHandler(async (req,res,next) => {
    const {email} = req.user
    const adminUser = await User.findOne({email})
    if(!!adminUser && adminUser.role !== 'admin' ) {
        throw new Error('You are not Admin')
    }else {
       next()
    }
})

module.exports =  {authHandler, isAdmin} 