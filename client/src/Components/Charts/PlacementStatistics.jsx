import React, {useEffect,useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

function PlacementStatistics() {
  const [placementData, setPlacementData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Students Placed',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/placed-students/placed-students');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const labels = data.map(item => item.name);
        const values = data.map(item => item.count);

        setPlacementData({
          labels,
          datasets: [
            {
              label: 'Students Placed',
              data: values,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching placement statistics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Placement Statistics</h2>
      <Bar data={placementData} />
    </div>
  );
}

export default PlacementStatistics;