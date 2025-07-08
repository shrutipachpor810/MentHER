import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // "14:00" for display
  endTime: { type: String, required: true },   // "15:00" for display
  startDateTime: { type: Date, required: true }, // for precise splitting
  endDateTime: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("TimeSlot", timeSlotSchema);
