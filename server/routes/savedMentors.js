import express from 'express';
import auth from '../middleware/auth.js';
import { saveMentor, getSavedMentors, unsaveMentor } from '../controllers/savedMentorController.js';

const router = express.Router();

router.post('/:id', auth, saveMentor);       // Save mentor
router.get('/', auth, getSavedMentors);      // Get all saved
router.delete('/:id', auth, unsaveMentor);   // Unsave mentor

export default router;
