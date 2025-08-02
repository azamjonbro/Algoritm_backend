const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createDefaultAdmin = require("./config/defaultAdmin");
const AuthRouter = require("./routes/auth.route");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api/sertificates", require("./routes/sertificate.route"));

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




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portda ishlayapti`));
