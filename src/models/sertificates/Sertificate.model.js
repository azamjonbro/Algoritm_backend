const mongoose = require('mongoose');

const SertificateSchema = new mongoose.Schema({
 first_Name: {
  type: String,
  required: true,
  trim: true
 },
 last_Name: {
  type: String,
  required: true,
  trim: true
 },
 teacherName: {
  type: String,
  required: true,
  trim: true
 },
 stack: {
  type: String,
  required: true,
  trim: true
 },
 accepted_Date: {
  type: Date,
  required: true
 },
 sertificate_Id: {
  type: String,
  required: true,
  unique: true, 
  trim: true
 },
 is_active: {
  type: Boolean,
  default: true
 }
}, {
 timestamps: true
});

module.exports = mongoose.model('Sertificate', SertificateSchema);