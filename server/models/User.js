import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  availability: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
