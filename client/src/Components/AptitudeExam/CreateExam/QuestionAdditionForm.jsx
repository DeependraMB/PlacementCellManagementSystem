// components/QuestionAdditionForm.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const QuestionAdditionForm = ({ numberOfQuestions, onSubmit }) => {
  const [questions, setQuestions] = useState(
    Array.from({ length: numberOfQuestions }, () => ({
      questionText: "",
      options: ["", "", "", ""],
      correctOptions: [],
    }))
  );

  const handleChange = (e, index, optionIndex) => {
    const { name, value, type, checked } = e.target;

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      if (type === "checkbox") {
        const isOptionAlreadyCorrect = updatedQuestions[index].correctOptions.includes(
          optionIndex
        );

        if (checked && !isOptionAlreadyCorrect) {
          updatedQuestions[index].correctOptions.push(optionIndex);
        } else if (!checked && isOptionAlreadyCorrect) {
          const indexToRemove = updatedQuestions[index].correctOptions.indexOf(
            optionIndex
          );
          updatedQuestions[index].correctOptions.splice(indexToRemove, 1);
        }
      } else if (name.startsWith("options")) {
        updatedQuestions[index].options[optionIndex] = value;
      } else if (name.startsWith("questionText")) {
        updatedQuestions[index].questionText = value;
      }
      return updatedQuestions;
    });
  };

  const handleAddQuestion = () => {
    onSubmit(questions);
  };

  const handleSubmit = () => {

    onSubmit(questions);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <Paper elevation={3} style={{ padding: 20, margin: 20 }} key={index}>
          <h2>Question {index + 1}</h2>
          <form>
            <TextField
              label="Question Text"
              fullWidth
              required
              margin="normal"
              name={`questionText[${index}]`}
              value={questions[index]?.questionText || ""}
              onChange={(e) => handleChange(e, index)}
            />
            {[0, 1, 2, 3].map((optionIndex) => (
              <TextField
                xs={6}
                key={optionIndex}
                label={`Option ${optionIndex + 1}`}
                fullWidth
                required
                margin="normal"
                name={`options[${index}][${optionIndex}]`}
                value={questions[index]?.options[optionIndex] || ""}
                onChange={(e) => handleChange(e, index, optionIndex)}
              />
            ))}
          </form>
          <Box display="flex" justifyContent="flex-end">
            {[0, 1, 2, 3].map((optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                control={
                  <Checkbox
                    name={`correctOptions[${index}]`}
                    value={optionIndex}
                    checked={questions[index]?.correctOptions.includes(
                      optionIndex
                    )}
                    onChange={(e) => handleChange(e, index, optionIndex)}
                  />
                }
                label={`Correct Answer${optionIndex + 1}`}
              />
            ))}
          </Box>
        </Paper>
      ))}
      <Button type="button" onClick={handleAddQuestion} variant="contained">
        {questions.length < numberOfQuestions ? "Next Question" : "Submit Exam"}
      </Button>
      {questions.length === numberOfQuestions && (
        <Button type="button" onClick={handleSubmit} variant="contained" style={{marginBottom: "8px"}}>
          Submit Exam
        </Button>
      )}
    </div>
  );
};

export default QuestionAdditionForm;
