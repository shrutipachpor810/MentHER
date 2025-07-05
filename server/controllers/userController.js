import User from '../models/User.js';

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    console.log("Decoded user:", req.user); // ✅ Debug log

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { ...req.body },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
