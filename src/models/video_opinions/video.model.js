const { Schema, model } = require('mongoose');

const videoOpinionSchema = new Schema(
  {
    title: { type: String, required: true },
    direction: { type: String, required: true },
    videoPath: { type: String, required: true }, // masalan: /uploads/file-123.mp4
    videoUrl: { type: String, required: true },  // to'liq URL: http(s)://host/uploads/file-123.mp4
    telegramPostId: { type: String }, // Telegram post ID, agar kerak bo'lsa
    InstagramPostId: { type: String }, // Instagram post ID, agar kerak bo'lsa
    DateNews: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    PosterImagePath: { type: String }, // video uchun poster image yo'li
    PosterImageUrl: { type: String }, // video uchun poster image to'liq URL
  },
  { timestamps: true }
);

module.exports = model('VideoOpinion', videoOpinionSchema);
