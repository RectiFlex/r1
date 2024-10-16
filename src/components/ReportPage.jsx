// src/components/ReportPage.jsx

import React, { useState, useEffect } from 'react';

const ReportPage = () => {
  const [workOrderData, setWorkOrderData] = useState([]);

  useEffect(() => {
    fetch('/api/report/workorders') // Update with the correct API endpoint
      .then((response) => response.json())
      .then((data) => setWorkOrderData(data))
      .catch((error) => console.error('Error fetching work order data:', error));
  }, []);

  return (
    <div>
      <h2>Work Order Report</h2>
      <ul>
        {workOrderData.map((workOrder) => (
          <li key={workOrder._id}>
            <p>Title: {workOrder.title}</p>
            <p>Description: {workOrder.description}</p>
            <p>Priority: {workOrder.priority}</p>
            <p>Technician: {workOrder.assignedTechnician}</p>
            <p>Due Date: {workOrder.dueDate}</p>
            <p>Status: {workOrder.status}</p>
            <p>Maintenance Type: {workOrder.maintenanceType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;