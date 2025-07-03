import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js'; // Auth routes
import protectedRoutes from './routes/protected.js'; // Protected routes

dotenv.config();

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

// ✅ Default test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
