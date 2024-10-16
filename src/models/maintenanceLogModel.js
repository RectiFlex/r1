// src/models/maintenanceLogModel.js

const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
  maintenanceType: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  technician: { type: String, required: true },
});

const MaintenanceLog = mongoose.model('MaintenanceLog', maintenanceLogSchema);

module.exports = MaintenanceLog;