const path = require('path');
const videoOpinionModel = require('../../models/video_opinions/video.model');


exports.createVideoOpinion = async (req, res) => {
  try {
    const {
      title,
      direction,
      telegramPostId,
      InstagramPostId,
      DateNews,
      likes,
    } = req.body;

    // Fayllar bo‘lmasa
    if (!req.files || !req.files.video || !req.files.poster) {
      return res.status(400).json({
        message: "video va poster fayllari majburiy (form-data: video, poster)",
      });
    }

    // Fayllarni olish
    const videoFile = req.files.video[0];
    const posterFile = req.files.poster[0];

    // Yo‘llarni tayyorlash
    const videoRelativePath = path.posix.join("/uploadImages", videoFile.filename);
    const posterRelativePath = path.posix.join("/uploadImages", posterFile.filename);

    const videoUrl = `${req.protocol}://${req.get("host")}${videoRelativePath}`;
    const posterUrl = `${req.protocol}://${req.get("host")}${posterRelativePath}`;

    // Model yaratish
    const newVideoOpinion = new videoOpinionModel({
      title,
      direction,
      videoPath: videoRelativePath,
      videoUrl,
      PosterImagePath: posterRelativePath,
      PosterImageUrl: posterUrl,
      telegramPostId,
      InstagramPostId,
      DateNews,
      likes,
    });

    await newVideoOpinion.save();

    return res.status(201).json({
      message: "Video opinion muvaffaqiyatli yaratildi",
      videoOpinion: newVideoOpinion,
    });
  } catch (error) {
    console.error("Error creating video opinion:", error);
    return res.status(500).json({ message: "Server xatosi" });
  }
};
exports.getVideoOpinions = async (req, res) => {
  try {
    const videoOpinions = await videoOpinionModel.find().lean();
    return res.status(200).json(videoOpinions);
  } catch (error) {
    console.error("Error fetching video opinions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.getVideoOpinionById = async (req, res) => {
  try {
    const videoOpinionId = req.params.id;
    const videoOpinion = await videoOpinionModel.findById(videoOpinionId);

    if (!videoOpinion) {
      return res.status(404).json({ message: "Video opinion topilmadi" });
    }

    return res.status(200).json(videoOpinion);
  } catch (error) {
    console.error("Error fetching video opinion:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.updateVideoOpinion = async (req, res) => {
  try {
    const videoOpinionId = req.params.id;
    const { title, direction, telegramPostId, InstagramPostId, DateNews, likes, PosterImagePath, PosterImageUrl } = req.body;

    if (!title || !direction) {
      return res.status(400).json({ message: "title va direction majburiy" });
    }

    const updatedVideoOpinion = await videoOpinionModel.findByIdAndUpdate(
      videoOpinionId,
      { title, direction, telegramPostId, InstagramPostId, DateNews, likes, PosterImagePath, PosterImageUrl },
      { new: true }
    );

    if (!updatedVideoOpinion) {
      return res.status(404).json({ message: "Video opinion topilmadi" });
    }

    return res.status(200).json({
      message: "Video opinion yangilandi",
      videoOpinion: updatedVideoOpinion,
    });
  } catch (error) {
    console.error("Error updating video opinion:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.deleteVideoOpinion = async (req, res) => {
  try {
    const videoOpinionId = req.params.id;
    const deletedVideoOpinion = await videoOpinionModel.findByIdAndDelete(videoOpinionId);

    if (!deletedVideoOpinion) {
      return res.status(404).json({ message: "Video opinion topilmadi" });
    }

    return res.status(200).json({ message: "Video opinion o'chirildi" });
  } catch (error) {
    console.error("Error deleting video opinion:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.getVideoOpinionByDirection = async (req, res) => {
  try {
    const { direction } = req.query;

    if (!direction) {
      return res.status(400).json({ message: "Direction query parameter majburiy" });
    }

    const videoOpinions = await videoOpinionModel.find({ direction }).sort({ createdAt: -1 });

    if (videoOpinions.length === 0) {
      return res.status(404).json({ message: "Video opinions topilmadi" });
    }

    return res.status(200).json(videoOpinions);
  } catch (error) {
    console.error("Error fetching video opinions by direction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
exports.getVideoOpinionByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query parameter majburiy" });
    }

    const videoOpinions = await videoOpinionModel.find({ title: new RegExp(title, 'i') }).sort({ createdAt: -1 });

    if (videoOpinions.length === 0) {
      return res.status(404).json({ message: "Video opinions topilmadi" });
    }

    return res.status(200).json(videoOpinions);
  } catch (error) {
    console.error("Error fetching video opinions by title:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}