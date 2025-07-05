import express from 'express';
import auth from '../middleware/auth.js';
import { submitFeedback } from '../controllers/feedbackController.js';

const router = express.Router();
router.post('/:bookingId', auth, submitFeedback);

export default router;
