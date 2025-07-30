const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

 if (!token) {
  return res.status(401).json({ message: 'Token required' });
 }

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded; // foydalanuvchi ma'lumotlarini requestga qo'shish
  next();
 } catch (err) {
  return res.status(403).json({ message: 'Invalid token' });
 }
};

module.exports = authMiddleware;