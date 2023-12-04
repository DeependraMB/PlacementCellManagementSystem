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
  padding: '16px', // Optional: Add padding for better appearance
  marginBottom: '20px',
});

function PlacementStatistics() {
  const [placementData, setPlacementData] = useState({
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Students Placed',
        data: [200, 177, 357, 170, 9],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
    <StyledPaper elevation={3}>
      <Bar data={placementData} options={{ maintainAspectRatio: false }} />
    </StyledPaper>
    </>
  );
}

export default PlacementStatistics;
