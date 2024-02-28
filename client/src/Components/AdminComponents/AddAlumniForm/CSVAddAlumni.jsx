import React, { useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const CSVAddAlumni = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/alumni/register-csv', formData);

      console.log(response.data);
      // Handle success or display a message
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      // Handle error or display an error message
    }
  };

  const handleDownloadTemplate = () => {
   
    const csvData = "email,password\njohn@example.com,password123\njane@example.com,securePwd456";
  
    const blob = new Blob([csvData], { type: 'text/csv' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    
    link.download = 'template.csv';
  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
  };
  

  return (
    <Container>
       <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadTemplate}
          style={{ position: 'absolute', top: 0, right: 0, marginTop: "100px" ,marginRight: "10px"}}
        >
          Download Template
        </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Typography component="h1" variant="h5">
          Upload Excel File
        </Typography>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          style={{ margin: '20px 0' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export default CSVAddAlumni;
