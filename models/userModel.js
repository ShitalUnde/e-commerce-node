const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

userSchema.pre('save', async (next)=> {

})

//Export the model
module.exports = mongoose.model('UsersCollection', userSchema);