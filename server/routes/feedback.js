import express from 'express';
import auth from '../middleware/auth.js';
import { submitFeedback, getFeedbackForMentor } from '../controllers/feedbackController.js';

const router = express.Router();

// Submit feedback
router.post('/:bookingId', auth, submitFeedback);

// Get feedback for mentor
router.get('/mentor', auth, getFeedbackForMentor);

export default router;
