import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id & role
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default auth;
