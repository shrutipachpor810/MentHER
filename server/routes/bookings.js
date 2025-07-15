import express from 'express';
import auth from '../middleware/auth.js';
import { createBooking } from '../controllers/bookingController.js';
import { getUpcomingBookings, getPastBookings, getMentorUpcomingBookings, getMentorPastBookings} from '../controllers/bookingController.js';


const router = express.Router();

router.post('/', auth, createBooking); // mentee books a slot with mentor
router.get('/upcoming', auth, getUpcomingBookings);
router.get('/past', auth, getPastBookings);
router.get('/mentor/upcoming', auth, getMentorUpcomingBookings);
router.get("/mentor/past", auth, getMentorPastBookings);
export default router;
