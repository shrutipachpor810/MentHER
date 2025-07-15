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
export const getMentorRatings = async (req, res) => {
  
  try {
    console.log("Decoded mentor ID:", req.user.id);
    const ratings = await Rating.find({ mentorId: req.user.id }).populate('menteeId', 'name email');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ratings' });
  }
};
