// src/routes.js

const express = require('express');
const router = express.Router();
const workOrderController = require('./controllers/workOrderController');

router.post('/api/maintenance-logs', maintenanceLogController.createMaintenanceLog);
router.get('/api/maintenance-logs', maintenanceLogController.getMaintenanceLogs);
router.get('/api/report/workorders', workOrderController.getWorkOrderDataForReport);
router.get('/api/workorders/filter', workOrderController.getWorkOrdersByTimePeriod); // New endpoint for time period filtering

module.exports = router;