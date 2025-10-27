const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createDefaultAdmin = require("./config/defaultAdmin");
const AuthRouter = require("./routes/auth.route");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Statik fayllar
const uploadsPath = path.join(__dirname, "src", "uploads");
app.use("/uploads", express.static(uploadsPath));

// Routerlar
app.use("/api/auth", AuthRouter);
app.use("/api/sertificates", require("./routes/sertificate.route"));
app.use("/api/opinions", require("./routes/opinion.route"));
app.use("/api/videos", require("./routes/video.route"));

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ MongoDB ulandi");
  await createDefaultAdmin();
})
.catch(err => console.error("❌ MongoDB ulanish xatosi:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Server ishlayapti 🚀");
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portda ishlayapti`));
