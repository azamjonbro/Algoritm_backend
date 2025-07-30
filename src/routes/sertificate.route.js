const express = require('express');
const sertificateController = require('../controllers/Sertificates/Sertificate.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// Create
router.post('/', authMiddleware, sertificateController.createSertificate);

// Read all
router.get('/', authMiddleware, sertificateController.getAllSertificates);

// Read one
router.get('/:id', authMiddleware, sertificateController.getSertificateById);

// Update
router.put('/:id', authMiddleware, sertificateController.updateSertificate);

// Delete
router.delete('/:id', authMiddleware, sertificateController.deleteSertificate);

module.exports = router;