const User  = require('../models/userModel')
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')

const authHandler = asyncHandler(async(req,res,next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
            token = req.headers.authorization.split(" "[1])
            try{
                if(token){
                    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
                    console.log(decoded)
                }
            }
            catch(err){
                throw new Error('Not Authorized token expired')
            }
    }else {
        throw new Error('There is no token to header')
    }
})

module.exports =  {authHandler} 