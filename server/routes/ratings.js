import express from 'express';
import auth from '../middleware/auth.js';
import { submitRating } from '../controllers/ratingController.js';

const router = express.Router();
router.post('/:mentorId', auth, submitRating);

export default router;
