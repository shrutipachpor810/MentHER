import express from 'express';
import auth from '../middleware/auth.js';
import {
  createBooking,
  getUpcomingBookings,
  getPastBookings,
  getUpcomingBookingsForMentor,
  getPastBookingsForMentor
} from '../controllers/bookingController.js';

const router = express.Router();

// ✅ Mentee routes
router.post('/', auth, createBooking);
router.get('/upcoming', auth, getUpcomingBookings);
router.get('/past', auth, getPastBookings);

// ✅ Mentor routes
router.get('/mentor/upcoming', auth, getUpcomingBookingsForMentor);
router.get('/mentor/past', auth, getPastBookingsForMentor);

export default router;
