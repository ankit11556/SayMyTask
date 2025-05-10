const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({message: 'Not authorized, no token'})
    }

    const decoded = jwt.verify(token,process.env.JWT_KEY);

    req.user = await User.findById(decoded.userId).select('-password')

    next()

  } catch (error) {
     return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}