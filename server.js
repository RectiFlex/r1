// server.js

import express from 'express';
import mongoose from 'mongoose';
import workOrderModel from './src/models/workOrderModel.js';
import routes from './src/routes.js'; // Import routes
import initSocketServer from './src/socketServer.js'; // Import Socket.IO server setup
import { getWorkOrdersData, getAnalyticsData } from './src/controllers/workOrderController.js'; // Import controller functions
import maintenanceLogController from './src/controllers/maintenanceLogController.js'; // Import maintenance log controller

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/rectiflex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Set up API endpoints for work orders after successful connection
  app.use(express.json()); // Parse incoming JSON data
  app.use('/', routes); // Use the imported routes
  app.post('/api/maintenance-logs', maintenanceLogController.createMaintenanceLog); // New route for maintenance log entries

  // New routes for fetching work order data and analytics
  app.get('/api/workorders', getWorkOrdersData);
  app.get('/api/analytics', getAnalyticsData);

  const server = initSocketServer(app); // Initialize Socket.IO server
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});