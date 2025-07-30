const bcrypt = require("bcryptjs");
const User = require("../models/auth/AdminModal");

async function createDefaultAdmin() {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10); 
      const admin = new User({
        username: "root",
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("✅ Default admin yaratildi: root / admin123");
    } else {
      console.log("ℹ️ Admin allaqachon mavjud");
    }
  } catch (error) {
    console.error("❌ Admin yaratishda xatolik:", error);
  }
}

module.exports = createDefaultAdmin;
