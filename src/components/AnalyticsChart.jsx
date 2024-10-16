import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const AnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    fetch('/api/analytics')
      .then((response) => response.json())
      .then((data) => setAnalyticsData(data))
      .catch((error) => console.error('Error fetching analytics data:', error));
  }, []);

  return (
    <div>
      <h3>Analytics Chart</h3>
      <Bar
        data={{
          labels: analyticsData.labels || [],
          datasets: [
            {
              label: 'Analytics Data',
              data: analyticsData.values || [],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default AnalyticsChart;