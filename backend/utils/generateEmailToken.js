const jwt = require('jsonwebtoken')

const generateEmailVerificationToken = (userId) =>{
  return jwt.sign({userId},
    process.env.JWT_EMAIL_SECRET,    
    {expiresIn: "10m"}
  )
}

module.exports = generateEmailVerificationToken