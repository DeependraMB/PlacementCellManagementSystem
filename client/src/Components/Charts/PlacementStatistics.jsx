import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
Chart.register(CategoryScale);

// Styling the Paper component
const StyledPaper = styled(Paper)({
  marginLeft: '240px',
  height: '495px', // Set the desired height
  width: '800px', // Set the desired width
  padding: '6px', // Optional: Add padding for better appearance
  marginBottom: '20px',

});

function PlacementStatistics() {
  const [placementData, setPlacementData] = useState({
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Students Placed',
        data: [200, 127, 357, 170, 29],
        backgroundColor: 'red',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 0.5,
        barThickness: 20,
      },
    ],
  });


  return (
    <>
    <StyledPaper elevation={3}>
      <Bar data={placementData} options={{ maintainAspectRatio: false, scales: {
        
      } }} />
    </StyledPaper>
    </>
  );
}

export default PlacementStatistics;
