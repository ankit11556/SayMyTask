const User = require('../models/User')

exports.signup = async (req,res) => {
  try {
    const {name,email,password} = req.body;

    const user = await User.findOne({email});

    if(user){
      return res.status(400).json({message: 'User already exists' })
    }
    
    user = new User({name,email,password});
    await user.save();

    const token = generateToken(user);

    sendTokenCookie(token,res);

    res.status(201).json({message: 'User registered successfully', user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}