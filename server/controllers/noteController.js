import Note from '../models/Note.js';

export const addNote = async (req, res) => {
  const { bookingId } = req.params;
  const { content } = req.body;

  try {
    const note = new Note({
      bookingId,
      menteeId: req.user.id,
      content
    });
    await note.save();
    res.status(201).json({ message: 'Note added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add note' });
  }
};

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ menteeId: req.user.id }).populate('bookingId');
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};
