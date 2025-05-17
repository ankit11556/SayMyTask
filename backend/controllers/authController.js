const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const sendTokenToCookie = require('../utils/sendTokenToCookie')
const bcrypt = require('bcrypt')
const sendEmail = require('../services/emailService')
const generateEmailVerificationToken = require('../utils/generateEmailToken')
const jwt = require('jsonwebtoken')
//signup
exports.signup = async (req,res) => {
  try {
    const {email,password} = req.body;
    const existUser = await User.findOne({email});

    if(existUser){
      return res.status(400).json({message: 'User already exists' })
    }
    
   const user = await User.create({email,password});

   const emailToken = generateEmailVerificationToken(user._id)
     
   const verifyLink = `${process.env.BASE_URL}/verify-email?token=${emailToken}`

    await sendEmail(
      user.email,
      "Verify your email",
      `<h3>Click to verify your email:</h3>
      <a href="${verifyLink}" target="_blank" style="padding:10px 15px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;display:inline-block;">Click Here to Verify</a>`
    )

    res.status(201).json({message: "Signup successful. Please verify your email to activate your account", 
      user:{
        _id: user._id,
        email: user.email
      }})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

//login
exports.login = async (req,res) => {
  try {
    const {email,password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Email and password required'}) 
    }

    const user = await User.findOne({email}).select('+password');

    if (!user.isVerified) {
       return res.status(401).json({ message: "Please verify your email first" });
   }

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

//logout
exports.logout = (req,res) =>{
  res.clearCookie('accessToken',{
    httpOnly: true,
    secure: true,
     path: "/",
    sameSite: 'strict',
  });

  res.clearCookie('refreshToken', {
  httpOnly: true,
  secure: true,
  path: '/',
  sameSite: 'strict',
});
  res.status(200).json({message: 'Logged out successfully'})
}

//verify email
exports.verifyEmail = async (req,res) => {
  const {token} = req.body;
 
  if(!token){
    return res.status(400).json({message: "Invalid token"})
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_EMAIL_SECRET); 
    const user = await User.findById(decoded.userId);

    if(!user){
      return res.status(404).json({message: "user not found"});
    }

    if(user.isVerified){
      return res.status(400).json({message:"Email already verified"})
    }

    user.isVerified = true
    await user.save();

   return res.status(200).json({message: "Email verified successfully"})
  } catch (error) {
    return res.status(400).json({message: "Token expired or invalid"})
  }
}

exports.refreshAccessToken = (req,res) =>{
  const refreshToken = req.cookies.refresh_token;

  if(!refreshToken){
    return res.status(401).json({message: "Refresh token missing"});
  }

  jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,decoded)=>{
    if(err){
      return res.status(403).json({message: 'Invalid refresh token'})
    }

    const {accessToken} = generateToken(decoded.userId);

    sendTokenToCookie(res,accessToken,)

    res.json({message: "Nes access token generated successfully"})
  })
}