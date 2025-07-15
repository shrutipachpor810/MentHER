import express from 'express';
import auth from '../middleware/auth.js';
import { addNote, getMyNotes, getMentorNotes } from '../controllers/noteController.js';

const router = express.Router();

router.post('/:bookingId', auth, addNote);
router.get('/', auth, getMyNotes);
router.get('/mentor', auth, getMentorNotes);

export default router;
