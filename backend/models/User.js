const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/,"Please use a valid email address"]
  },

  password: {
    type: String,
    required: function () {
      return this.authType === "email"
    },
    select: false,
    minlength: [6,"Password must be at least 6 characters"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  },
  authType:{
    type: String,
    enum: ["email","google"],
    default: "email"
  }
},{timestamps:true})
  
userSchema.pre('save',async function (next) {
  if (!this.isModified("password")) return next();
  try{
  this.password = await bcrypt.hash(this.password,10);
  next();
  }catch(error){
    next(error)
  }
})

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);

module.exports = User;