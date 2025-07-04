import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Auth routes
import protectedRoutes from './routes/protected.js'; // Protected routes
import dashboardRoutes from './routes/dashboard.js';
import userRoutes from './routes/users.js';
import mentorRoutes from './routes/mentors.js';
import bookingRoutes from './routes/bookings.js';
import feedbackRoutes from './routes/feedback.js';
import ratingRoutes from './routes/ratings.js';
import noteRoutes from './routes/notes.js';
import savedMentorRoutes from './routes/savedMentors.js';
import chatRoutes from './routes/chatRoutes.js';


const app = express();

app.use(cors());
app.use(express.json()); // Required for POST JSON

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ✅ Use routes
app.use('/api/auth', authRoutes);          // Auth endpoints
app.use('/api', protectedRoutes);          // Protected test route
app.use('/api/dashboard', dashboardRoutes);// ✅ Default test route
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/saved-mentors', savedMentorRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("GEMINI API KEY:", process.env.GEMINI_API_KEY);
