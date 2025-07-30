const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Token required' });
  }

  // Bearer TOKEN formatini olish va qo'shtirnoqlarni olib tashlash
  let token = authHeader.split(' ')[1];
  token = token.replace(/['"]+/g, ''); // qo'shtirnoqlarni olib tashlaydi

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
