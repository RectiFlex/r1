import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WorkOrderForm from './components/WorkOrderForm';
import WorkOrderEditForm from './components/WorkOrderEditForm';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="filters">
          <label>Status:</label>
          <select name="status" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <label>Priority:</label>
          <select name="priority" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label>Assigned Technician:</label>
          <input type="text" name="assignedTechnician" onChange={handleFilterChange} />
        </div>

        <Switch>
          <Route path="/work-orders/new" component={WorkOrderForm} />
          <Route path="/work-orders/edit/:id" component={WorkOrderEditForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;