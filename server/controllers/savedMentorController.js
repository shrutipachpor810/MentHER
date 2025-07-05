import SavedMentor from '../models/SavedMentor.js';

export const saveMentor = async (req, res) => {
  try {
    const { id: mentorId } = req.params;

    const alreadySaved = await SavedMentor.findOne({ mentorId, menteeId: req.user.id });
    if (alreadySaved) {
      return res.status(400).json({ message: 'Mentor already saved' });
    }

    const saved = new SavedMentor({ mentorId, menteeId: req.user.id });
    await saved.save();
    res.status(201).json({ message: 'Mentor saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving mentor' });
  }
};

export const getSavedMentors = async (req, res) => {
  try {
    const saved = await SavedMentor.find({ menteeId: req.user.id }).populate('mentorId', '-password');
    res.json({ mentors: saved.map((s) => s.mentorId) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching saved mentors' });
  }
};

export const unsaveMentor = async (req, res) => {
  try {
    const { id: mentorId } = req.params;

    await SavedMentor.findOneAndDelete({ mentorId, menteeId: req.user.id });
    res.json({ message: 'Mentor removed from saved list' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing saved mentor' });
  }
};
