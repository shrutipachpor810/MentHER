import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getDashboardData);

export default router; // 👈 MUST include this for ESM import
