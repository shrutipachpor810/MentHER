import User from '../models/User.js';
import multer from 'multer';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ✅ Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});

export const upload = multer({ storage: storage });

export const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePic = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: "Profile picture uploaded", profilePic: user.profilePic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
