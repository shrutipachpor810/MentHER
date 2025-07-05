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
