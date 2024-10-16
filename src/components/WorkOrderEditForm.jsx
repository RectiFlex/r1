// src/components/WorkOrderEditForm.jsx

import { useState } from 'react';

const WorkOrderEditForm = ({ workOrder }) => {
  const [formData, setFormData] = useState(workOrder);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateWorkOrder = async (id, status, notifications) => {
    try {
      const response = await fetch(`/api/workorders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notifications }),
      });
      const data = await response.json();
      // Handle notification display to the user
    } catch (error) {
      console.error('Error updating work order:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/workorders/${workOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Work order updated successfully!');
        // Trigger notifications when work order is updated
        handleUpdateWorkOrder(workOrder._id, formData.status, ['Notification message']);
      } else {
        alert('Failed to update work order. Please try again.');
      }
    } catch (error) {
      console.error('Error updating work order:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Work Order</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

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

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default WorkOrderEditForm;