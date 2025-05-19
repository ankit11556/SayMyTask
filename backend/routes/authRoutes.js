const express = require('express')
const router = express.Router();

const {signup,login,logout,verifyEmail, refreshAccessToken, checkAuth} = require('../controllers/authController')
 

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post('/verify-email',verifyEmail)
router.post("/refresh-token",refreshAccessToken)
router.get("/check-auth",checkAuth)
module.exports = router