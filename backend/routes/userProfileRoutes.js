const express = require('express');
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')
const {createUserProfile,getUserProfile} = require('../controllers/userProfileController')

router.post("/",protect,createUserProfile)
router.get("/",protect,getUserProfile)
module.exports = router
