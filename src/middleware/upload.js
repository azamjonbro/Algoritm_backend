const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(process.cwd(), 'src', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^\w.-]+/g, '_');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const videoExt = new Set(['.mp4','.webm','.ogg','.mov','.mkv','.m4v','.avi','.3gp']);
const imageExt = new Set(['.jpg','.jpeg','.png','.webp']);

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();
  if (file.fieldname === 'video') {
    if (mime.startsWith('video/') || (mime === 'application/octet-stream' && videoExt.has(ext))) {
      return cb(null, true);
    }
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'video'));
  }

  if (file.fieldname === 'poster') {
    if (mime.startsWith('image/') || (mime === 'application/octet-stream' && imageExt.has(ext))) {
      return cb(null, true);
    }
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'poster'));
  }
  return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024
  }
});

module.exports = upload;
