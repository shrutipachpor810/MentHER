import express from 'express';
import auth from '../middleware/auth.js';
import { createBooking } from '../controllers/bookingController.js';
import { getUpcomingBookings, getPastBookings, getMentorUpcomingBookings, getMentorPastBookings} from '../controllers/bookingController.js';


const router = express.Router();

// ✅ Mentee routes
router.post('/', auth, createBooking);
router.get('/upcoming', auth, getUpcomingBookings);
router.get('/past', auth, getPastBookings);
router.get('/mentor/upcoming', auth, getMentorUpcomingBookings);
router.get("/mentor/past", auth, getMentorPastBookings);
export default router;
