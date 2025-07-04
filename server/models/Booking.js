import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
