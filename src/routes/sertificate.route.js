const express = require('express');
const sertificateController = require('../controllers/Sertificates/Sertificate.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// Create
router.post('/',  sertificateController.createSertificate);

// Read all
router.get('/', sertificateController.getAllSertificates);

// Read one
router.get('/:id', authMiddleware, sertificateController.getSertificateById);

// Update
router.put('/:id', sertificateController.updateSertificate);

// Delete
router.delete('/:id',authMiddleware, sertificateController.deleteSertificate);

module.exports = router;