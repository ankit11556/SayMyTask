const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
   },
   name: {
    type: String,
    required: true,
   },
   language:{
    type: String,
    required: true,
   }
})

const UserProfile = mongoose.model('UserProfile',userProfileSchema);

module.exports = UserProfile