import express from 'express';
import auth from '../middleware/auth.js';
import { getMyProfile, updateMyProfile } from '../controllers/userController.js';

const router = express.Router();
router.get('/me', auth, getMyProfile);
router.put('/me', auth, updateMyProfile);

export default router;
