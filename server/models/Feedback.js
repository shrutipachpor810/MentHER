import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  feedback: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
