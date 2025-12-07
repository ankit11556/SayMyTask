const UserProfile = require("../models/UserProfile");

exports.createUserProfile = async (req, res) => {
  try {
    const { name, language } = req.body;
    const userId = req.user._id;

    const existing = await UserProfile.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "Profile aleardy exists" });
    }

    const newProfile = await UserProfile.create({ userId, name, language });
    res.status(201).json({
      message: "Profile create successfully",
      newProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create profile" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.find({ userId: req.user._id });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, language } = req.body;

    const edit = await UserProfile.findByIdAndUpdate(
      { _id: id, userId: req.user._id },
      { name, language },
      { new: true, runValidators: true }
    );

    if (!edit) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", edit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
