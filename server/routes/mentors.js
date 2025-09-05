import express from 'express';
import auth from '../middleware/auth.js';
import {
  getMentors,
  getMentorSlots,
  getMentorById,
  addAvailability,
  removeAvailability
} from '../controllers/mentorController.js';

const router = express.Router();

// ✅ Fetch all mentors
router.get('/', auth, getMentors);

// ✅ Fetch a specific mentor by ID
router.get('/:id', auth, getMentorById);

// ✅ Fetch slots of a specific mentor
router.get('/:id/slots', auth, getMentorSlots);

// ✅ Add availability for the logged-in mentor
router.patch('/me/availability', auth, addAvailability);

// ✅ Remove availability for the logged-in mentor
router.patch('/me/availability/remove', auth, removeAvailability);

export default router;
