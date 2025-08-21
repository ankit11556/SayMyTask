const express = require('express')
const router = express.Router();

const {signup,login,logout,verifyEmail, refreshAccessToken,  loginWithGoogle} = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
 

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post('/verify-email',verifyEmail)
router.get("/refresh-token",refreshAccessToken)
router.get("/check-auth",authMiddleware.protect,(req,res)=>{
  const userId = req.user._id;
  res.json({userId})
})
router.get("/google",loginWithGoogle)
module.exports = router