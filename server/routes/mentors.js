import express from 'express';
import auth from '../middleware/auth.js';
import {
  getMentors,
  getMentorSlots,
  getMentorById,
  addAvailability,
  removeAvailability // ✅ this is now only imported, not redefined
} from '../controllers/mentorController.js';

const router = express.Router();

router.get('/', auth, getMentors);
router.get('/:id', auth, getMentorById);
router.get('/:id/slots', auth, getMentorSlots);
router.patch('/me/availability', auth, addAvailability);
router.patch('/me/availability/remove', auth, removeAvailability);

export default router;
