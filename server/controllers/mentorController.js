import User from '../models/User.js';

// ✅ Get mentor by ID
export const getMentorById = async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id).select('-password');
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get mentor' });
  }
};

// ✅ Get all mentors
export const getMentors = async (req, res) => {
  try {
    const { skills, search } = req.query;
    let query = { role: 'mentor' };

    if (skills) {
      query.skills = { $in: skills.split(',') }; // supports multi-skill filtering
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { skills: { $elemMatch: { $regex: search, $options: 'i' } } },
      ];
    }

    const mentors = await User.find(query).select('-password');

    res.status(200).json({ success: true, mentors });
  } catch (err) {
    console.error('Error in getMentors:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch mentors' });
  }
};

// ✅ Get a mentor's slots by ID (for mentees to view)
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

// ✅ Update mentor profile by ID (if needed)
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

// ✅ Add availability slots (uses JWT!)
export const addAvailability = async (req, res) => {
  try {
    const { slots } = req.body; // slots = array of strings

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: 'Slots must be a non-empty array.' });
    }

    // 👉 Always get mentor by JWT
    const mentor = await User.findById(req.user.id);

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    mentor.availability.push(...slots);
    await mentor.save();

    res.json({ success: true, availability: mentor.availability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add slots' });
  }
};

// ✅ Remove availability slot (uses JWT!)
export const removeAvailability = async (req, res) => {
  try {
    const { slot } = req.body;

    const mentor = await User.findById(req.user.id);

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    mentor.availability = mentor.availability.filter(s => s !== slot);
    await mentor.save();

    res.json({ success: true, availability: mentor.availability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove slot' });
  }
};
