const router = require('express').Router();
const upload = require('../middleware/upload');
const {createVideoOpinion, getVideoOpinions, getVideoOpinionById, updateVideoOpinion, deleteVideoOpinion, getVideoOpinionByDirection, getVideoOpinionByTitle } = require('../controllers/video_opinion/videoOpinion');
const authMiddleware = require('../middleware/auth.middleware');

router.post(
  '/video-opinions',
  authMiddleware,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
  ]),
  createVideoOpinion
);
router.get('/video-opinions', getVideoOpinions);
router.get('/video-opinions/:id', getVideoOpinionById);
router.put('/video-opinions/:id', authMiddleware, updateVideoOpinion);
router.delete('/video-opinions/:id', authMiddleware, deleteVideoOpinion);
router.get('/video-opinions/direction', getVideoOpinionByDirection);
router.get('/video-opinions/title', getVideoOpinionByTitle);
module.exports = router;
