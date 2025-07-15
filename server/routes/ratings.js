import express from 'express';
import auth from '../middleware/auth.js';
import { submitRating, getMentorRatings } from '../controllers/ratingController.js';

const router = express.Router();
router.post('/:mentorId', auth, submitRating);
router.get('/mentor', auth, getMentorRatings);
export default router;

