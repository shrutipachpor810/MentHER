import Note from '../models/Note.js';
import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

// ✅ Add a note — mentee creates
export const addNote = async (req, res) => {
  const { bookingId } = req.params;
  const { content } = req.body;

  try {
    console.log("➡️ Add Note - bookingId:", bookingId, "content:", content);

    // Ensure bookingId is ObjectId
    const note = new Note({
      bookingId: new mongoose.Types.ObjectId(bookingId),
      menteeId: new mongoose.Types.ObjectId(req.user.id),
      content
    });

    await note.save();
    console.log("✅ Note saved:", note);

    res.status(201).json({ message: 'Note added successfully' });
  } catch (err) {
    console.error("❌ Failed to add note:", err);
    res.status(500).json({ message: 'Failed to add note' });
  }
};

// ✅ Get all notes for logged-in mentee
export const getMyNotes = async (req, res) => {
  try {
    console.log("➡️ Get My Notes - menteeId:", req.user.id);

    const notes = await Note.find({ menteeId: new mongoose.Types.ObjectId(req.user.id) })
      .populate('bookingId');

    console.log(`✅ Found ${notes.length} notes`);
    res.json({ notes });
  } catch (err) {
    console.error("❌ Failed to fetch my notes:", err);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};


// ✅ Get all notes for logged-in mentor’s bookings
export const getMentorNotes = async (req, res) => {
  try {
    console.log("➡️ Get Mentor Notes - mentorId:", req.user.id);

    const mentorId = new mongoose.Types.ObjectId(req.user.id);

    // Find all bookings for this mentor
    const bookings = await Booking.find({ mentor: mentorId });
    console.log(`✅ Found ${bookings.length} bookings for mentor`);

    // Collect booking IDs
    const bookingIds = bookings.map(b => b._id);

    // Find all notes linked to these bookings
    const notes = await Note.find({ bookingId: { $in: bookingIds } })
      .populate("menteeId", "name email")
      .populate("bookingId");

    console.log(`✅ Found ${notes.length} notes for mentor`);
    res.json({ notes });
  } catch (err) {
    console.error("❌ Failed to fetch mentor notes:", err);
    res.status(500).json({ message: "Failed to fetch mentor notes" });
  }
};
