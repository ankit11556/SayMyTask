const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const sendTokenToCookie = require('../utils/sendTokenToCookie')
const bcrypt = require('bcrypt')

exports.signup = async (req,res) => {
  try {
    const {name,email,password} = req.body;

    const existUser = await User.findOne({email});

    if(existUser){
      return res.status(400).json({message: 'User already exists' })
    }
    
   const user =  User.create({name,email,password});
     

    const {accessToken,refreshToken} = generateToken(user._id);

    sendTokenToCookie(res,accessToken,refreshToken);

    res.status(201).json({message: 'User registered successfully', 
      user:{
        _id: user._id,
        name: user.name,
        email: user.email
      }})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.login = async (req,res) => {
  try {
    const {email,password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Email and password required'}) 
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
      return res.status(401).json({message: 'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(401).json({message: 'Invalid credentials'})
    }

    const {accessToken,refreshToken} = generateToken(user._id)

    sendTokenToCookie(res,accessToken,refreshToken)

    const {_id,name}  = user;
    res.status(200).json({
      message: 'Login successful',
      user: {_id,name, email}
    })
    
  } catch (error) {
     console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}