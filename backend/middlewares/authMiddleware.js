const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next) => {
  try {
    const token = 
      req.cookies.access_token || 
      (req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer") && 
        req.headers.authorization.split(" ")[1]
      );

    if (!token) {
      return res.status(401).json({message: 'Not authorized, no token'})
    }

    let decoded;
    try {
       decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({message: "Session expired. Please login again"})
      }
        return res.status(401).json({message: "Invalid token. Please login."})
    }

    const user = await User.findById(decoded.userId).select('-password');
    if(!user){
      return res.status(401).json({message: "User not found. Please sign up."})
    }

    req.user = user;
  
    next()

  } catch (error) {
    console.error("Auth middleware error:",error);
     return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

module.exports = {protect}