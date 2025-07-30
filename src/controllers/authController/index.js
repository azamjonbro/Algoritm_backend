const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/auth/AdminModal.js");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Foydalanuvchi borligini tekshirish
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Noto'g'ri parol" });
    }

    // Token yaratish
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Muvaffaqiyatli tizimga kirdingiz",
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error });
  }
};
