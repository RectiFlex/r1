// src/components/MaintenanceLogList.jsx

import React, { useState, useEffect } from 'react';

const MaintenanceLogList = () => {
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);

  useEffect(() => {
    fetch('/api/maintenance-logs')
      .then((response) => response.json())
      .then((data) => setMaintenanceLogs(data))
      .catch((error) => console.error('Error fetching maintenance logs:', error));
  }, []);

  return (
    <div>
      <h3>Maintenance Log Entries</h3>
      <ul>
        {maintenanceLogs.map((log) => (
          <li key={log._id}>
            <p>Maintenance Type: {log.maintenanceType}</p>
            <p>Description: {log.description}</p>
            <p>Date: {log.date}</p>
            <p>Technician: {log.technician}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceLogList;