// src/socketServer.js

import { Server } from 'socket.io';
import http from 'http';

const initSocketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return server;
};

export default initSocketServer;
```

```javascript
// server.js

import initSocketServer from './src/socketServer.js';

// Existing code

const server = initSocketServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

```javascript
// src/routes.js

import { Server } from 'socket.io';

// Import necessary modules

const io = new Server(server);

// Inside the POST /workorders route
router.post('/workorders', async (req, res) => {
  const { title, description, priority, assignedTechnician, dueDate, status, maintenanceType } = req.body;

  try {
    const newWorkOrder = new WorkOrder({
      title,
      description,
      priority,
      assignedTechnician,
      dueDate,
      status,
      maintenanceType,
    });

    const savedWorkOrder = await newWorkOrder.save();
    io.emit('newWorkOrder', savedWorkOrder); // Emit a notification event
    res.status(201).json(savedWorkOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

```javascript
// src/components/WorkOrderNotifications.jsx

import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connect to the Socket.IO server

const WorkOrderNotifications = () => {
  useEffect(() => {
    socket.on('newWorkOrder', (newWorkOrder) => {
      // Handle the new work order notification
      console.log('New work order created:', newWorkOrder);
      // You can display a notification to the user here
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default WorkOrderNotifications;
```

```javascript
// src/App.jsx

import WorkOrderNotifications from './components/WorkOrderNotifications';

function App() {
  return (
    <div>
      {/* Other components */}
      <WorkOrderNotifications />
    </div>
  );
}

export default App;