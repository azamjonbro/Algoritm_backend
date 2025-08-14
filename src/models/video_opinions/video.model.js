const { Schema, model } = require('mongoose');

const videoOpinionSchema = new Schema(
  {
    title: { type: String, required: true },
    direction: { type: String, required: true },
    videoPath: { type: String, required: true }, // masalan: /uploads/file-123.mp4
    videoUrl: { type: String, required: true },  // to'liq URL: http(s)://host/uploads/file-123.mp4
  },
  { timestamps: true }
);

module.exports = model('VideoOpinion', videoOpinionSchema);
