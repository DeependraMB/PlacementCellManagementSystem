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
  TablePagination,
} from "@mui/material";
import TryIcon from "@mui/icons-material/Try";
import AssistantIcon from "@mui/icons-material/Assistant";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const ShowFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState("all"); // Default: Show all feedbacks
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [positiveFeedbacks, setPositiveFeedbacks] = useState(0);
  const [negativeFeedbacks, setNegativeFeedbacks] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/feedback/get-feedback`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error("Error fetching feedback data:", error));
  }, []);

  useEffect(() => {
    // Filtering feedbacks based on the selected category (student, teacher, alumni)
    const filteredFeedbacks = feedbackData.filter((feedback) => {
      if (filter === "all") {
        return true; // Show all feedbacks
      } else {
        // Check the category and filter accordingly
        return feedback.role === filter;
      }
    });

    // Set the filtered feedbacks in the state
    setFilteredFeedbacks(filteredFeedbacks);
  }, [filter, feedbackData]);

  useEffect(() => {
    // Update feedback counts when filteredFeedbacks change
    setTotalFeedbacks(filteredFeedbacks.length);
    setPositiveFeedbacks(
      filteredFeedbacks.filter((feedback) => feedback.sentimentScore >= 0)
        .length
    );
    setNegativeFeedbacks(
      filteredFeedbacks.filter((feedback) => feedback.sentimentScore < 0).length
    );
  }, [filteredFeedbacks]);

  console.log(feedbackData);

  const handleMoreDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        <Paper
          elevation={1}
          style={{
            width: "fit-content",
            height: "fit-content",
            marginRight: "10px",
            marginTop: "21px",
            padding: "8px 8px 8px 8px",
            marginLeft: "14px",
          }}
        >
          <TryIcon sx={{ color: "red" }} />
        </Paper>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            marginTop: "20px",
            fontWeight: "bolder",
            fontFamily: "nunito",
            textAlign: "start",
          }}
        >
          Feedback List
        </Typography>
      </div>
      <div>
        <Paper elevation={3} sx={{ margin: "15px 15px 15px 15px" }}>
          <div
            style={{
              borderBottom: "1px solid grey",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{
                fontWeight: "bolder",
                fontFamily: "nunito",
                textAlign: "start",
                paddingLeft: "30px",
                paddingTop: "6px",
              }}
            >
              Feedback Overview
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              padding: "30px 15px",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "40px",
            }}
          >
            <div style={{ display: "flex", marginRight: "80px" }}>
              <Paper
                elevation={3}
                style={{
                  borderRadius: "50%",
                  marginRight: "10px",
                  padding: "10px",
                  alignItems: "center",
                  backgroundColor: "lightblue",
                }}
              >
                <TryIcon
                  sx={{
                    fontSize: "30px",
                    margin: "7px 7px 7px 7px",
                    backgroundColor: "Lightblue",
                    color: "black",
                  }}
                />
              </Paper>
              <div>
                <div style={{fontWeight: "bolder"}}>Total Feedbacks</div>
                <div style={{ fontSize: "30px" }}>{totalFeedbacks}</div>
              </div>
            </div>
            <div style={{ display: "flex", marginRight: "80px" }}>
              <Paper
                elevation={3}
                style={{
                  borderRadius: "50%",
                  marginRight: "10px",
                  padding: "10px",
                  backgroundColor: "green",
                }}
              >
                <ThumbUpAltIcon
                  sx={{
                    fontSize: "30px",
                    margin: "7px 7px 7px 7px",
                    color: "white",
                    backgroundColor: "green",
                  }}
                />
              </Paper>
              <div>
                <div style={{fontWeight: "bolder", color:"green"}}>Positive Feedbacks</div>
                <div style={{ fontSize: "30px" }}>{positiveFeedbacks}</div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <Paper
                elevation={3}
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  backgroundColor: "red",
                }}
              >
                <ThumbDownAltIcon
                  sx={{
                    fontSize: "30px",
                    margin: "7px 7px 7px 7px",
                    color: "white",
                    backgroundColor: "red",
                  }}
                />
              </Paper>
              <div>
                <div style={{fontWeight: "bolder", color: "red"}}>Negative Feedbacks</div>
                <div style={{ fontSize: "30px" }}>{negativeFeedbacks}</div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "0.1px solid grey",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <Button
              variant="outlined"
              gutterBottom
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: "bolder",
                fontFamily: "nunito",
                textAlign: "start",
                paddingLeft: "30px",
                paddingTop: "6px",
                borderRadius: "50px",
              }}
            >
              View Complete Report
            </Button>
          </div>
        </Paper>
      </div>
      <Paper
        elevation={3}
        style={{
          padding: 20,
          maxWidth: "97%",
          margin: "20px auto",
          marginTop: "30px",
        }}
      >
        <InputLabel
          style={{
            marginBottom: "10px",
            float: "left",
            marginTop: "3px",
            fontWeight: "bolder",
          }}
        >
          Filter By:{" "}
        </InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          style={{
            marginBottom: "20px",
            float: "left",
            width: "140px",
            height: "30px",
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="alumni">Alumni</MenuItem>
        </Select>

        {filteredFeedbacks.length === 0 ? (
          <Typography variant="body1">No feedback available.</Typography>
        ) : (
          <>
            <TableContainer>
              <Table style={{ backgroundColor: "#f0f0f0" }}>
                <TableHead style={{ paddingLeft: "30px", height: "50px" }}>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bolder",
                        paddingLeft: "200px",
                        backgroundColor: "#d6d4d4",
                      }}
                    >
                      Subject
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bolder",
                        backgroundColor: "#d6d4d4",
                      }}
                    >
                      Author
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bolder",
                        paddingLeft: "140px",
                        backgroundColor: "#d6d4d4",
                      }}
                    >
                      More Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFeedbacks
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((feedback) => (
                      <TableRow key={feedback._id}>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            paddingLeft: "200px",
                            height: "40px",
                          }}
                        >
                          {feedback.subject}
                        </TableCell>
                        <TableCell style={{ height: "40px" }}>
                          {feedback.author}
                        </TableCell>
                        <TableCell
                          style={{ paddingLeft: "120px", height: "40px" }}
                        >
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredFeedbacks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
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
              {`Date/Time: ${new Date(
                selectedFeedback?.dateTime
              ).toLocaleString()}`}
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
