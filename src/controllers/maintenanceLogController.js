// maintenanceLogController.js

const MaintenanceLog = require('../models/maintenanceLogModel');

const createMaintenanceLog = async (req, res) => {
  try {
    const { maintenanceType, description, date, technician } = req.body;

    const newMaintenanceLog = new MaintenanceLog({
      maintenanceType,
      description,
      date,
      technician,
    });

    await newMaintenanceLog.save();

    res.status(201).json({ message: 'Maintenance log entry created successfully' });
  } catch (error) {
    console.error('Error creating maintenance log entry:', error);
    res.status(500).json({ error: 'Failed to create maintenance log entry' });
  }
};

const getMaintenanceLogs = async (req, res) => {
  try {
    const maintenanceLogs = await MaintenanceLog.find();
    res.status(200).json(maintenanceLogs);
  } catch (error) {
    console.error('Error fetching maintenance log entries:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance log entries' });
  }
};

module.exports = { createMaintenanceLog, getMaintenanceLogs };