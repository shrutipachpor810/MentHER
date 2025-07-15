import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth.js";
import User from "../models/User.js"; // assuming mentees are in User model with role: 'mentee'

const router = express.Router();

// Multer setup for profile pic uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

/**
 * @route GET /api/mentees/me
 * @desc Get current mentee profile
 * @access Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const mentee = await User.findById(req.user.id).select("-password");
    if (!mentee || mentee.role !== "mentee") {
      return res.status(404).json({ message: "Mentee not found" });
    }
    res.json(mentee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route PUT /api/mentees/me
 * @desc Update current mentee profile
 * @access Private
 */
router.put("/me", auth, async (req, res) => {
  try {
    const { name, bio, skills, goals } = req.body;
    const mentee = await User.findById(req.user.id);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(404).json({ message: "Mentee not found" });
    }

    mentee.name = name || mentee.name;
    mentee.bio = bio || mentee.bio;
    mentee.skills = skills || mentee.skills;
    mentee.goals = goals || mentee.goals;

    await mentee.save();
    res.json(mentee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route POST /api/mentees/upload-profile-pic
 * @desc Upload mentee profile picture
 * @access Private
 */
router.post("/upload-profile-pic", auth, upload.single("profilePic"), async (req, res) => {
  try {
    const mentee = await User.findById(req.user.id);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(404).json({ message: "Mentee not found" });
    }

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    mentee.profilePic = `${baseUrl}/uploads/${req.file.filename}`;
    await mentee.save();

    res.json({ profilePicUrl: mentee.profilePic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile picture upload failed" });
  }
});

export default router;
