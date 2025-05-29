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
    required: [true,'Name is required'],
    trim: true,
    minlength: [2,'Name must be at 2 charactors'],
    maxlength: [50,'Name must be less than 50 characters']
   },
   language:{
    type: String,
    required: [true,'Language is required'],
    trim: true
   }
},{timestamps: true})



const UserProfile = mongoose.model('UserProfile',userProfileSchema);

module.exports = UserProfile