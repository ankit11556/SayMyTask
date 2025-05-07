const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const sendTokenToCookie = require('../utils/sendTokenToCookie')

exports.signup = async (req,res) => {
  try {
    const {name,email,password} = req.body;

    const existUser = await User.findOne({email});

    if(existUser){
      return res.status(400).json({message: 'User already exists' })
    }
    
   const user =  User.create({name,email,password});
    // await user.save();

    const {accessToken,refreshToken} = generateToken(user._id);

    sendTokenToCookie(res,accessToken,refreshToken);

    res.status(201).json({message: 'User registered successfully', user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}