// controllers/feedbackController.js

import Feedback from '../models/Feedback.js';
import Booking from '../models/Booking.js';

// ✅ Submit feedback by mentee
export const submitFeedback = async (req, res) => {
  const { bookingId } = req.params;
  const { feedback } = req.body;

  try {
    const newFeedback = new Feedback({
      bookingId,
      menteeId: req.user.id,
      feedback
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
};

// ✅ Get feedback for mentor
export const getFeedbackForMentor = async (req, res) => {
  try {
    const mentorId = req.user.id;

    // Get all bookings for this mentor
    const bookings = await Booking.find({ mentorId }).select('_id');
    const bookingIds = bookings.map(b => b._id);

    // Fetch feedbacks for these bookings
    const feedbacks = await Feedback.find({ bookingId: { $in: bookingIds } })
      .populate('bookingId', 'slot status') // optionally add more fields
      .populate('menteeId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ feedbacks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
};
