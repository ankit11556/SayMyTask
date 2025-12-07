const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createUserProfile,
  getUserProfile,
  editUserProfile,
} = require("../controllers/userProfileController");

router.post("/", protect, createUserProfile);
router.get("/", protect, getUserProfile);
router.put("/:id", protect, editUserProfile);
module.exports = router;
