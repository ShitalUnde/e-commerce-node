const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model

// const AddressSchema = Schema({
//     city: String,
//     street: String,
//     houseNumber: String,
//   });

var userSchema = Schema({
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
    role: {
        type: String,
        default:'user'
    },
    cart:{
        type: Array,
        default: []
    },
    address: [{
        type: Schema.Types.ObjectId,
        required: true,
      }],
      wishlist:[{
        type: Schema.Types.ObjectId
      }],
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// userSchema.post('save', async function(next) {
//     const salt = await bcrypt.genSaltSync(10)
//     this.password = await bcrypt.hash(this.password,salt)
// })

userSchema.methods.isPasswordMatch = async function(enteredPassword) {
    
    return await bcrypt.compare(enteredPassword,this.password)
}
//Export the model
module.exports = mongoose.model('UsersCollection', userSchema);