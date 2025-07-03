import express from 'express';
import auth from '../middleware/auth.js'; // JWT middleware

const router = express.Router();

router.get('/protected', auth, (req, res) => {
  res.json({
    message: 'This is a protected route!',
    user: req.user
  });
});

export default router;
