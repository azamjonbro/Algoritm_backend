const router = require('express').Router();
const upload = require('../middleware/upload');
const {createVideoOpinion, getVideoOpinions, getVideoOpinionById, updateVideoOpinion, deleteVideoOpinion, getVideoOpinionByDirection, getVideoOpinionByTitle } = require('../controllers/video_opinion/videoOpinion');

// form-data: fields (title, direction), file (video)
router.post('/video-opinions', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'poster', maxCount: 1 }]), createVideoOpinion);
router.get('/video-opinions', getVideoOpinions);
router.get('/video-opinions/:id', getVideoOpinionById);
router.put('/video-opinions/:id', updateVideoOpinion);
router.delete('/video-opinions/:id', deleteVideoOpinion);
router.get('/video-opinions/direction', getVideoOpinionByDirection);
router.get('/video-opinions/title', getVideoOpinionByTitle);
module.exports = router;
