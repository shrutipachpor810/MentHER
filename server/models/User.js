import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  
  // Store availability as an array of strings (can later convert to date objects if needed)
  availability: { type: [String], default: [] },

  profilePic: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
