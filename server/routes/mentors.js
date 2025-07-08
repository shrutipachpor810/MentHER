import express from 'express';
import auth from '../middleware/auth.js';
import {
  getMentors,
  getMentorSlots,
  updateMentorProfile,
} from '../controllers/mentorController.js';

const router = express.Router();

// ✅ Get all mentors with optional filtering
router.get('/', auth, getMentors);

// ✅ Get specific mentor's available slots
router.get('/:id/slots', auth, getMentorSlots);

// ✅ Update mentor profile (for mentors to update their profile)
router.put('/:id', auth, updateMentorProfile);

export default router;
