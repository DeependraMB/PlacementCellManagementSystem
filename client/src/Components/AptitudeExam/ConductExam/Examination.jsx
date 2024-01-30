import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";

function Examination() {
  const { examId } = useParams();
  const [examDetails, setExamDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/exams/exam-values/${examId}`
        );
        const data = await response.json();

        setExamDetails(data);
        setTimeRemaining(data[0].duration * 60);
        const questionResponse = await fetch(
          `http://localhost:5000/exams/questions/${examId}`
        );
        const questions = await questionResponse.json();

        const questionsWithSerial = questions.map((question, index) => ({
          ...question,
          serialNumber: index + 1,
        }));

        setQuestions(questionsWithSerial);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    };

    fetchExamDetails();
  }, [examId]);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      // Time has expired, submit the exam
      handleSubmitExam();
    }

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitExam = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/exams/check-answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ examId, selectedOptions }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Exam submitted successfully. Score:", result.score);

        // Set the examScore and mark exam as submitted
        setExamScore(result.score);
        setExamSubmitted(true);
      } else {
        console.error("Failed to submit exam");
        // Handle submission failure, display an error message to the user, etc.
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      // Handle error, display an error message to the user, etc.
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Exam Details
      </Typography>
      {examDetails && questions.length > 0 ? (
        <Paper
          elevation={3}
          style={{ padding: "20px", margin: "20px", textAlign: "left" }}
        >
          <Typography variant="h6">{examDetails.examTitle}</Typography>
          <Typography variant="body2" color="text.secondary">
            Time Remaining: {Math.floor(timeRemaining / 60)}:
            {timeRemaining % 60} minutes
          </Typography>
          {questions.map((question) => (
            <div key={question._id}>
              <Typography variant="h6">
                {question.serialNumber}. {question.questionText}
              </Typography>
              <RadioGroup
                value={
                  selectedOptions[question._id] !== undefined
                    ? selectedOptions[question._id].toString()
                    : ""
                }
                onChange={(e) =>
                  handleOptionSelect(question._id, parseInt(e.target.value))
                }
              >
                {question.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={optionIndex.toString()}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleSubmitExam}
          >
            Submit Exam
          </Button>
          <Divider />

          {/* Result Section */}
          {examSubmitted && (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6">Exam Result:</Typography>
              {examScore !== null ? (
                <Typography variant="body1">
                  Your score: {examScore}/{questions.length}
                </Typography>
              ) : (
                <Typography variant="body1">Loading result...</Typography>
              )}
            </div>
          )}
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default Examination;
