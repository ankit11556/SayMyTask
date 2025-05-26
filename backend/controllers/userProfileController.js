const UserProfile = require("../models/UserProfile");

exports.createUserProfile = async (req,res) => {
  try {
     const {name,language} = req.body;   
     const  userId = req.user._id
   
   const existing = await UserProfile.findOne({userId})
   if(existing){
    return res.status(400).json({message: "Profile aleardy exists"})
   }

    const newProfile = await UserProfile.create({userId,name,language})
    res.status(201).json({message:"Profile create successfully", newProfile: {
    name: newProfile.name,
    language: newProfile.language,
  },})
  } catch (error) {
    res.status(500).json({ message: 'Failed to create profile' });
  }
}

exports.getUserProfile = async (req,res) => {
  try {
    const profile = await UserProfile.find({userId: req.user._id})
    res.status(200).json(profile) 
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}