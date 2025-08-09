const express = require('express')
const router = express.Router();

const {signup,login,logout,verifyEmail, refreshAccessToken, checkAuth, loginWithGoogle} = require('../controllers/authController')
 

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post('/verify-email',verifyEmail)
router.post("/refresh-token",refreshAccessToken)
router.get("/check-auth",checkAuth)
router.get("/google",loginWithGoogle)
module.exports = router