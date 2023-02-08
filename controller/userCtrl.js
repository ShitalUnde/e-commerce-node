const { json } = require("body-parser");
// const User = require("../models/userModel").collection;
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const {validateMongoDBId} = require('../utils/validateMongodbId')
const createUser = asyncHandler(
  async (req, res) => {
    const email = req.body.email;
  
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      const newUser =  await User.create(req.body);
      res.send(newUser)
    }
     else {
      throw new Error('User already exist')
    }
  }
)

const getAllUsers = asyncHandler(
  async (req,res) => {
    try{
      let result = await User.find();
      if(!!result && result.length > 0){
        res.send(result);
      }
      else {        
        res.send([]);
        //throw new Error('User is not created Yet')
      }
    }
    catch(err) {
      throw new Error(err)
    }
  }
)


const loginUserCtrl = asyncHandler(
  async (req,res) => {
    try{
      const {email,password} = req.body
        const findUser = await User.findOne({email});
        if(findUser && await findUser.isPasswordMatch(password)){
          const refreshToken = await generateRefreshToken(findUser?._id)
          const updateUser = await User.findByIdAndUpdate(findUser._id,{
            refreshToken: refreshToken
          }, {
            new: true
          })
         // console.log(updateUser)

          // 72 * 60 * 60 * 1000, 
          // 72 = 3 days
          // 60 = 60 min = 1hr
          // 60 = 60 sec = 1 min
          // 1000 ms = 1 min
          res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000, 
          })
          token = generateToken(findUser._id)
             res.send({
              id: findUser._id,
              firstName: findUser.firstName,
              lastName: findUser.lastName,
              email:findUser.email,
              password: findUser.password,
              mobile:findUser.mobile,
              token: generateToken(findUser._id)
             }) 
        }
        else{
            throw new Error('Credential doesn\'t match')
        }
    }
    catch(err) {
      throw new Error(err)
    }
  }
)


const handleRefreshToken = asyncHandler(async(req,res)=> {
  const cookie = req.cookies
  if(!cookie?.refreshToken){
    throw new Error('No refresh token in Cookie')
  }else {
     const refreshToken = cookie.refreshToken
    const findUser =await User.findOne({refreshToken})
    if(findUser){
      res.json(findUser)
    }else {
      throw new Error('No refresh token present in db or not matched')
    }
  }
})


const getUserById = asyncHandler(async (req,res) => {
 const {_id} = req.user
 validateMongoDBId(_id)
 try{
  const findUser = await User.findById(_id)
  if(!!findUser) res.send(findUser)
  else throw new Error('User not found')
}catch(err) {
  throw new Error(err)
}
})

const updateUserById = asyncHandler(async (req,res) => {
  const {_id} = req.user
  validateMongoDBId(_id)
     try{
         const findUser = await User.findByIdAndUpdate(_id, req.body,{new:true})
         if(!!findUser) res.send(findUser)
         else throw new Error('User not found')
     }catch(err) {
         throw new Error(err)
     }
 })

const deleteUserById = asyncHandler(async (req,res) => {
  const {id} = req.params
  validateMongoDBId(id)
     try{
         const findUser = await User.findByIdAndDelete(id)
         if(!!findUser) res.send(findUser)
         else throw new Error('User not found')
     }catch(err) {
         throw new Error(err)
     }
 })

 const blockUserById = asyncHandler(async (req,res) => {
  const {id} = req.params
  validateMongoDBId(id)
     try{
         const findUser = await User.findByIdAndUpdate(id, req.body,{new:true})
         if(!!findUser) res.send({
          "message": "User blocked successfully",
          "user":findUser
         })
    
         else throw new Error('User not found')
     }catch(err) {
         throw new Error(err)
     }
 })

 const unblockUserById = asyncHandler(async (req,res) => {
  const {id} = req.params
  validateMongoDBId(id)
     try{
         const findUser = await User.findByIdAndUpdate(id, req.body,{new:true})
         if(!!findUser) res.send({
          "message": "User unblocked successfully",
          "user":findUser
         })
    
         else throw new Error('User not found')
     }catch(err) {
         throw new Error(err)
     }
 })

module.exports = { createUser ,getAllUsers, loginUserCtrl, getUserById, deleteUserById, updateUserById, blockUserById , unblockUserById, handleRefreshToken};
