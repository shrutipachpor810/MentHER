import express from 'express';
import auth from '../middleware/auth.js';
import { getMentors, getMentorSlots } from '../controllers/mentorController.js';

const router = express.Router();

router.get('/', auth, getMentors); 
router.get('/:id/slots', auth, getMentorSlots);
export default router;
