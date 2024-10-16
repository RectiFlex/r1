// src/components/WorkOrderList.jsx

import React, { useState, useEffect } from 'react';

const WorkOrderList = () => {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    fetch('/api/workorders')
      .then((response) => response.json())
      .then((data) => setWorkOrders(data))
      .catch((error) => console.error('Error fetching work orders:', error));
  }, []);

  return (
    <div>
      <h3>Work Orders List</h3>
      <ul>
        {workOrders.map((workOrder) => (
          <li key={workOrder._id}>
            <p>Title: {workOrder.title}</p>
            <p>Description: {workOrder.description}</p>
            <p>Priority: {workOrder.priority}</p>
            <p>Technician: {workOrder.assignedTechnician}</p>
            <p>Status: {workOrder.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkOrderList;
```