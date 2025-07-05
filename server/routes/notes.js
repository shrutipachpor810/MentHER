import express from 'express';
import auth from '../middleware/auth.js';
import { addNote, getMyNotes } from '../controllers/noteController.js';

const router = express.Router();

router.post('/:bookingId', auth, addNote);
router.get('/', auth, getMyNotes);

export default router;
