const Sertificate = require('../../models/sertificates/Sertificate.model');


exports.createSertificate = async (req, res) => {
 try {
  const sertificate = new Sertificate(req.body);
  await sertificate.save();
  res.status(201).json(sertificate);
 } catch (err) {
  res.status(400).json({ error: err.message });
 }
};

// Get all sertificates
exports.getAllSertificates = async (req, res) => {
 try {
  const sertificates = await Sertificate.find();
  res.json(sertificates);
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
};

// Get a single sertificate by ID
exports.getSertificateById = async (req, res) => {
 try {
  const sertificate = await Sertificate.findById(req.params.id);
  if (!sertificate) {
   return res.status(404).json({ error: 'Sertificate not found' });
  }
 
  
  res.json(sertificate);
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
};

// Update a sertificate by ID
exports.updateSertificate = async (req, res) => {
 try {
  const sertificate = await Sertificate.findByIdAndUpdate(
   req.params.id,
   req.body,
   { new: true, runValidators: true }
  );
  if (!sertificate) {
   return res.status(404).json({ error: 'Sertificate not found' });
  }
  res.json(sertificate);
 } catch (err) {
  res.status(400).json({ error: err.message });
 }
};

// Delete a sertificate by ID
const mongoose = require('mongoose');

exports.deleteSertificate = async (req, res) => {
 try {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.status(400).json({ error: 'Invalid ID format' });
  }
  const sertificate = await Sertificate.findByIdAndDelete(req.params.id);
  if (!sertificate) {
   return res.status(404).json({ error: 'Sertificate not found' });
  }
  res.json({ message: 'Sertificate deleted' });
 } catch (err) {
  res.status(500).json({ error: err.message });
 }
};