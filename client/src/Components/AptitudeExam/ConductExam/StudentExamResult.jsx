// Result.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

function Result() {
  const { examId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`http://localhost:5000/exams/result/${examId}`);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching result:', error);
        // Handle error, display an error message to the user, etc.
      }
    };

    fetchResult();
  }, [examId]);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Exam Result
      </Typography>
      {result ? (
        <div>
          <Typography variant="h6">Your Score: {result.score}</Typography>
          {/* Display additional result information as needed */}
        </div>
      ) : (
        <Typography variant="body1">Loading result...</Typography>
      )}
    </Container>
  );
}

export default Result;
