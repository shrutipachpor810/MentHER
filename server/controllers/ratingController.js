import Rating from '../models/Rating.js';

export const submitRating = async (req, res) => {
  const { mentorId } = req.params;
  const { stars, comment } = req.body;

  try {
    const newRating = new Rating({
      mentorId,
      menteeId: req.user.id,
      stars,
      comment
    });
    await newRating.save();
    res.status(201).json({ message: 'Rating submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting rating' });
  }
};
