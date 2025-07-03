import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const getDashboardData = async (req, res) => {
  const user = req.user;

  try {
    if (user.role === 'mentor') {
      // Mentor sees their upcoming bookings
      const bookings = await Booking.find({ mentor: user.id }).populate('mentee', 'name email');
      return res.json({ role: 'mentor', bookings });
    } else if (user.role === 'mentee') {
      // Mentee sees available mentors
      const mentors = await User.find({ role: 'mentor' }).select('-password');
      return res.json({ role: 'mentee', mentors });
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
