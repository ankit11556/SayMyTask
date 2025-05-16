const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "Passsword is required"],
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  }
},{timestamps:true})

userSchema.pre('save',async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
})

userSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);

module.exports = User;