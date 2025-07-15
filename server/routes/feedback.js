import express from 'express';
import auth from '../middleware/auth.js';
import { submitFeedback, getMentorFeedbacks } from '../controllers/feedbackController.js';

const router = express.Router();
router.post('/:bookingId', auth, submitFeedback);
router.get('/mentor', auth, getMentorFeedbacks);

export default router;
