import User from '../models/User.js';

export const getMentors = async (req, res) => {
  try {
    const { skills, minExp } = req.query;

    let query = { role: 'mentor' };

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    if (minExp) {
      query.experience = { $gte: Number(minExp) };
    }

    const mentors = await User.find(query).select('-password');
    res.json(mentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch mentors' });
  }
};

export const getMentorSlots = async (req, res) => {
  try {
    const mentorId = req.params.id;

    // ⛳️ FIX: Add 'role' to the fields being selected
    const mentor = await User.findById(mentorId).select('availability name role');

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({ mentorName: mentor.name, availableSlots: mentor.availability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch mentor slots' });
  }
};

export const updateMentorProfile = async (req, res) => {
  try {
    const mentorId = req.params.id; // e.g. /api/mentor/:id
    const { name, qualification, bio, skills } = req.body;

    // Find the mentor and update
    const mentor = await User.findOneAndUpdate(
      { _id: mentorId, role: 'mentor' },
      { name, qualification, bio, skills },
      { new: true }
    ).select('-password');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({ success: true, data: mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update mentor profile' });
  }
};
