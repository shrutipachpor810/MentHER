import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slot: { type: String, required: true },
  status: { type: String, default: 'booked' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
