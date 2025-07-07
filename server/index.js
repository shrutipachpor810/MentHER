import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import dashboardRoutes from './routes/dashboard.js';
import userRoutes from './routes/users.js';
import mentorRoutes from './routes/mentors.js';
import bookingRoutes from './routes/bookings.js';
import feedbackRoutes from './routes/feedback.js';
import ratingRoutes from './routes/ratings.js';
import noteRoutes from './routes/notes.js';
import savedMentorRoutes from './routes/savedMentors.js';
import chatRoutes from './routes/chat.js';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupChat } from './realtime/chatSockets.js';
import { setupSignaling } from './realtime/signaling.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// REST API routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/dashboard', dashboardRoutes);
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

// Setup socket server
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

setupChat(io);
setupSignaling(io);

httpServer.listen(PORT, () => console.log(`Server + Socket.io running on port ${PORT}`));
console.log("GEMINI API KEY:", process.env.GEMINI_API_KEY);
