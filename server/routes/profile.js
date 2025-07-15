import express from 'express';
import { upload, uploadProfilePic } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Route for uploading profile pic
router.post('/upload-profile-pic', auth, upload.single('profilePic'), uploadProfilePic);

export default router;
