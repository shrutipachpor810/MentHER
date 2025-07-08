import User from '../models/User.js';

// ✅ Fetch all mentors (with optional filtering)
export const getMentors = async (req, res) => {
  try {
    const { skills, minExp } = req.query;

    const query = { role: 'mentor' };

    if (skills) {
      query.skills = { $in: skills.split(',') }; // supports multi-skill filtering
    }

    if (minExp) {
      query.experience = { $gte: Number(minExp) }; // filters mentors with experience >= minExp
    }

    const mentors = await User.find(query).select('-password');

    res.status(200).json({ success: true, mentors });
  } catch (err) {
    console.error('Error in getMentors:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch mentors' });
  }
};

// ✅ Get specific mentor's available slots
export const getMentorSlots = async (req, res) => {
  try {
    const mentorId = req.params.id;

    const mentor = await User.findById(mentorId).select('availability name role');

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }

    res.status(200).json({
      success: true,
      mentorName: mentor.name,
      availableSlots: mentor.availability || [],
    });
  } catch (err) {
    console.error('Error in getMentorSlots:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch mentor slots' });
  }
};

// ✅ Update mentor profile
export const updateMentorProfile = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const { name, qualification, bio, skills } = req.body;

    const mentor = await User.findOneAndUpdate(
      { _id: mentorId, role: 'mentor' },
      { name, qualification, bio, skills },
      { new: true }
    ).select('-password');

    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }

    res.status(200).json({ success: true, mentor });
  } catch (err) {
    console.error('Error in updateMentorProfile:', err);
    res.status(500).json({ success: false, message: 'Failed to update mentor profile' });
  }
};
