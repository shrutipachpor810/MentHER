import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Multer setup for profile pic uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// ✅ GET /api/users/me (Get current user's profile)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PUT /api/users/me (Update current user's profile)
router.put("/me", auth, async (req, res) => {
  try {
    const { name, bio, skills } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills; // should be an array

    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/users/upload-profile-pic
router.post("/upload-profile-pic", auth, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const baseUrl =
      process.env.BASE_URL ||
      `http://localhost:${process.env.PORT || 5000}`;

    user.profilePic = `${baseUrl}/uploads/${req.file.filename}`;
    await user.save();

    console.log("Profile pic updated:", user.profilePic);

    res.json({ profilePicUrl: user.profilePic });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Profile picture upload failed" });
  }
});

export default router;
