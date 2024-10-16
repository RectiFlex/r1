import { useState } from 'react';

const WorkOrderForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTechnician: '',
    dueDate: '',
    status: 'pending',
    maintenanceType: '', // Added maintenanceType field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/workorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Work order created successfully!');
      } else {
        alert('Failed to create work order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating work order:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Work Order</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>

        <label>Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleInputChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Assigned Technician:</label>
        <input type="text" name="assignedTechnician" value={formData.assignedTechnician} onChange={handleInputChange} required />

        <label>Due Date:</label>
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Maintenance Type:</label>
        <select name="maintenanceType" value={formData.maintenanceType} onChange={handleInputChange}>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="HVAC">HVAC</option>
          {/* Add more options as needed */}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkOrderForm;