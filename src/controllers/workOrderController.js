// src/controllers/workOrderController.js

import WorkOrder from '../models/workOrderModel.js';

// Fetch all work orders
export const getWorkOrdersData = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();
    res.json(workOrders);
  } catch (error) {
    console.error('Error fetching work orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch analytics data
export const getAnalyticsData = async (req, res) => {
  try {
    const analyticsData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      values: [65, 59, 80, 81, 56, 55, 40],
    };
    res.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch work order data for the report
export const getWorkOrderDataForReport = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find().select('title description priority assignedTechnician dueDate status maintenanceType');
    res.json(workOrders);
  } catch (error) {
    console.error('Error fetching work order data for report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch work orders data filtered by time periods
export const getWorkOrdersByTimePeriod = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const workOrders = await WorkOrder.find({
      dueDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json(workOrders);
  } catch (error) {
    console.error('Error fetching work orders by time period:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};