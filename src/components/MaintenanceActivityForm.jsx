import { useState } from 'react';
import MaintenanceLogList from './MaintenanceLogList'; // Import the new component

const MaintenanceActivityForm = () => {
  const [formData, setFormData] = useState({
    maintenanceType: '',
    description: '',
    date: '',
    technician: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/maintenance-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Maintenance activity logged successfully!');
      } else {
        alert('Failed to log maintenance activity. Please try again.');
      }
    } catch (error) {
      console.error('Error logging maintenance activity:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Log Maintenance Activity</h2>
      <form onSubmit={handleSubmit}>
        <label>Maintenance Type:</label>
        <select name="maintenanceType" value={formData.maintenanceType} onChange={handleInputChange}>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="HVAC">HVAC</option>
          {/* Add more options as needed */}
        </select>

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>

        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />

        <label>Technician:</label>
        <input type="text" name="technician" value={formData.technician} onChange={handleInputChange} required />

        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setShowLogs(!showLogs)}>
        {showLogs ? 'Hide Maintenance Logs' : 'Show Maintenance Logs'}
      </button>
      {showLogs && <MaintenanceLogList />}
    </div>
  );
};

export default MaintenanceActivityForm;