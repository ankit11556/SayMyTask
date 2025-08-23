const jwt = require('jsonwebtoken')

const generateToken = (userId,role) =>{
  try {
  const accessToken = jwt.sign(
    {userId, role, type: "access"},
    process.env.JWT_ACCESS_SECRET,
    {expiresIn: '10m'}
  );

  const refreshToken = jwt.sign(
    {userId, role, type:"refresh" },
    process.env.JWT_REFRESH_SECRET,    
    {expiresIn:"7d"}
  );

  return {accessToken,refreshToken}
  } catch (error) {
    console.error("Error generating token:",error);
    throw new Error("Token generated failed")
  }
};

module.exports = generateToken