// ExamDetails.js

import React, { useState, useEffect } from "react";
import { Paper, Button, Divider } from "@mui/material";

function ExamDetails({ exam }) {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleViewQuestions = async () => {
    try {
      if (!showQuestions) {
        const response = await fetch(
          `http://localhost:5000/exams/questions/${exam._id}`
        );
        const data = await response.json();
        setQuestions(data);
      }
      setShowQuestions((prevShowQuestions) => !prevShowQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", margin: "20px", textAlign: "center" }}
    >
      <h2 className="bolder">{exam.title}</h2>
      <p>
        Date: {exam.examDate} || Time: {exam.examTime}
      </p>
      <p>
        No of Questions: {exam.numberOfQuestions} || Category: {exam.category}{" "}
        || Duration: {exam.duration}
      </p>

      <Button
        variant="contained"
        color="primary"
        onClick={handleViewQuestions}
        style={{ marginTop: "10px" }}
      >
        {showQuestions ? "Close Questions" : "View Questions"}
      </Button>

      {showQuestions && (
        <div>
          <h3 className="pt-5">QUESTIONS</h3>
          <Divider sx={{ borderTop: "1px solid #000" }} />
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {questions.map((question) => (
              <li key={question._id} style={{ marginBottom: "20px" }}>
                <p className="my-3 bolder fs-5">
                  Question: {question.questionText}
                </p>
                <p>Options:</p>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {question.options.map((option, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                      {index}. {option}
                      {question.correctOptions.includes(index)
                        ? " (Correct)"
                        : ""}
                       
                    </li>
                    
                  ))}
                 <Divider sx={{ borderTop: "1px solid #000" }} />
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Paper>
  );
}

export default ExamDetails;
