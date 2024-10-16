// src/models/workOrderModel.js

const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  assignedTechnician: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true },
  notifications: [{ type: String }],
  maintenanceType: { type: String, required: true }, // Added maintenanceType field
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

module.exports = WorkOrder;