import Feedback from '../models/Feedback.js';

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
    res.status(500).json({ message: 'Error submitting feedback' });
  }
};

export const getMentorFeedbacks = async (req, res) => {
  try {
    console.log("Decoded mentor ID:", req.user.id);
    const feedbacks = await Feedback.find()
      .populate({
        path: 'bookingId',
        match: { mentor: req.user.id }
      })
      .populate('menteeId', 'name email');

    // Filter only feedbacks for bookings that match this mentor
    const filtered = feedbacks.filter(fb => fb.bookingId !== null);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
};
