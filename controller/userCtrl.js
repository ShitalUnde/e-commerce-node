const { json } = require("body-parser");
// const User = require("../models/userModel").collection;
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const createUser = asyncHandler(
  async (req, res) => {
    const email = req.body.email;
  
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      const newUser =  await Usleter.create(req.body);
     // console.log('newUser', JSON.stringify(newUser))
      res.send(newUser)
      // newUser.then(async(result) => {
      //      let data = await User.findOne(result.insertedId)
      //     // delete data.password;
      //   //  res.send(data);
      //   res.json(data)
  
      // }).catch((err) => {
      //     throw new Error('oops something went wrong')
      //   })
    }
     else {
      throw new Error('User already exist')
      // res.json({
      //   msg: "User already exist",
      //   success: false,
      // });
    }
  }
)

const getUser = asyncHandler(
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
      console.log(email,password)
        const findUser = await User.findOne({email: email});

        if(findUser && findUser.isPasswordMatch(password)){
             res.send('success') 
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
module.exports = { createUser ,getUser, loginUserCtrl};
