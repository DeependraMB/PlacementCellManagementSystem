import React, { useState } from "react";
import { Paper, Box, TextField, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";

const PlacementPredictionForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "Female",
    Stream: "Mechanical",
    Internships: "",
    CGPA: "",
    HistoryOfBacklogs: "",
  });

  const [placementResult, setPlacementResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        data: [
          parseInt(formData.Age),
          formData.Gender,
          formData.Stream,
          parseInt(formData.Internships),
          parseInt(formData.CGPA),
          parseInt(formData.HistoryOfBacklogs),
        ],
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/mlapp/predict/",
        data
      );
      setPlacementResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "30px" }}>
        {placementResult ? (
          <Box
            style={{
              width: "1000px",
              height: "450px",
              paddingTop: "130px"
            }}
          >
            <h2>Placement Prediction</h2>
            {placementResult.placement_status === "Placed" ? (
              <p>Congratulations! You have a high chance of being placed.</p>
            ) : (
                <p>Your chances of being placed are low. Keep working hard!</p>
            )}
            <p>The probability of placement is: {(placementResult.placement_probability * 100).toFixed(2)}%</p>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} style={{marginBottom: ""}}>
            <h2>Placement Prediction Form</h2>
            <TextField
              label="Age"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
            <br />
            <br />
            <Select
              label="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <br />
            <br />
            <Select
              label="Stream"
              name="Stream"
              value={formData.Stream}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Electronics And Communication">
                Electronics And Communication
              </MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Information Technology">
                Information Technology
              </MenuItem>
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
              <MenuItem value="Civil">Civil</MenuItem>
            </Select>
            <br />
            <br />
            <TextField
              label="Internships"
              name="Internships"
              value={formData.Internships}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
            <br />
            <br />
            <TextField
              label="CGPA"
              name="CGPA"
              value={formData.CGPA}
              onChange={handleChange}
              type="number"
              step="0.01"
              fullWidth
              required
            />
            <br />
            <br />
            <TextField
              label="History of Backlogs"
              name="HistoryOfBacklogs"
              value={formData.HistoryOfBacklogs}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Predict Placement
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default PlacementPredictionForm;
