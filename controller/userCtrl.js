const { json } = require("body-parser");
// const User = require("../models/userModel").collection;
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

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
        throw new Error('User is not created Yet')
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

const getUserById = asyncHandler(async (req,res) => {
 const {id} = req.params
 console.log(id)
 try{
  const findUser = await User.findById(id)
  if(!!findUser) res.send(findUser)
  else throw new Error('User not found')
}catch(err) {
  throw new Error(err)
}
})

const updateUserById = asyncHandler(async (req,res) => {
  const {id} = req.params
  console.log(id)
     try{
         const findUser = await User.findByIdAndUpdate(id, req.body,{new:true})
         if(!!findUser) res.send(findUser)
         else throw new Error('User not found')
     }catch(err) {
         throw new Error(err)
     }
 })

const deleteUserById = asyncHandler(async (req,res) => {
  const {id} = req.params
  console.log(id)
     try{
         const findUser = await User.findByIdAndDelete(id)
         if(!!findUser) res.send(findUser)
         else throw new Error('User not found')
     }catch(err) {
         throw new Error(err)
     }
 })

module.exports = { createUser ,getAllUsers, loginUserCtrl, getUserById, deleteUserById, updateUserById};
