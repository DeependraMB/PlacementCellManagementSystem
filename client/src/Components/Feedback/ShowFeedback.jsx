import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const ShowFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState("all"); // Default: Show all feedbacks

  useEffect(() => {
    fetch(`http://localhost:5000/feedback/get-feedback?filter=${filter}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error("Error fetching feedback data:", error));
  }, [filter]);

  const handleMoreDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          marginTop: "20px",
          fontWeight: "bolder",
          fontFamily: "nunito",
          textAlign: "center",
        }}
      >
        Feedback List
      </Typography>
      <Paper
        elevation={3}
        style={{
          padding: 20,
          maxWidth: "70%",
          margin: "20px auto",
          marginTop: "30px",
        }}
      >
        <InputLabel style={{ marginBottom: "10px",float: "left" ,marginTop: "3px", fontWeight: "bolder"}}>Filter By: </InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          style={{ marginBottom: "20px",float:"left", width:"140px",height: "30px" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="alumni">Alumni</MenuItem>
        </Select>

        {feedbackData.length === 0 ? (
          <Typography variant="body1">No feedback available.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead style={{ paddingLeft: "30px" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder", paddingLeft: "100px" }}>
                    Subject
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Author</TableCell>
                  <TableCell style={{ fontWeight: "bolder", paddingLeft: "140px" }}>
                    More Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbackData.map((feedback) => (
                  <TableRow key={feedback._id}>
                    <TableCell style={{ fontWeight: "bolder", paddingLeft: "90px" }} >{feedback.subject}</TableCell>
                    <TableCell>{feedback.author}</TableCell>
                    <TableCell style={{ paddingLeft: "120px" }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleMoreDetails(feedback)}
                      >
                        More Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Dialog for More Details */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle align="center">
            {selectedFeedback?.subject} - Details
          </DialogTitle>
          <DialogContent>
            <Typography>{`Author: ${selectedFeedback?.author}`}</Typography>
            <Typography>{`Email: ${selectedFeedback?.email}`}</Typography>
            <Typography>{`Message: ${selectedFeedback?.message}`}</Typography>
            <Typography>
              {`Date/Time: ${new Date(selectedFeedback?.dateTime).toLocaleString()}`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default ShowFeedback;
