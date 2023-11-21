import React, { useState } from "react";
import ExamCreationForm from "./ExamCreationForm";
import QuestionAdditionForm from "./QuestionAdditionForm";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




const ExamCreator = () => {
  const [examDetails, setExamDetails] = useState(null);
  const [examQuestions, setExamQuestions] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const { auth, setAuth } = useAuth();
  const history = useNavigate();



  const handleExamDetailsSubmit = (details) => {
    console.log("Exam Details Submitted:", details);
    setExamDetails(details);
    setShowQuestionForm(true); // Set to true when details are submitted
  };

  const questionDetails={
         author: auth.name,
         
         
  }
  const authorDetails={
    author: auth.name,
    email: auth.email,
    
}

  const handleExamQuestionsSubmit = async (questions) => {
    console.log("Exam Questions Submitted:", questions);
    setExamQuestions(questions);
    const examWithAuthor ={
        ...examDetails,
        ...authorDetails
      };

    try {
      const examResponse = await axios.post(
        "http://localhost:5000/exams/exam-details",
        examWithAuthor
      );
      console.log("Exam Response:", examResponse.data);

      const questionsWithExamId = questions.map((question) => ({
      ...question,
      ...questionDetails,
      examId: examResponse.data._id,
    }));

    // Step 3: Send the questions to the backend
    const questionsResponse = await axios.post(
      `http://localhost:5000/exams/questions/${examResponse.data._id}`,
      questionsWithExamId
    );
    console.log("Questions Response:", questionsResponse.data);
    history("/teacher-exam-list");
    toast.success("Exam Created Successfully!!!")
    } catch (error) {
      console.error("Error submitting data to the backend:", error);
      // Handle error, show a message, etc.
    }
  };

  console.log("Exam Details:", examDetails);
  console.log("Exam Questions:", examQuestions);
  console.log("Show Question Form:", showQuestionForm);

  return (
    <div>
      {!examDetails || showQuestionForm ? (
        <div>
          <ExamCreationForm onSubmit={handleExamDetailsSubmit} />
          {showQuestionForm && (
            <QuestionAdditionForm
              numberOfQuestions={examDetails.numberOfQuestions}
              onSubmit={handleExamQuestionsSubmit}
            />
          )}
        </div>
      ) : (
        <div>
          <h1>Exam Details</h1>
          <pre>{JSON.stringify(examDetails, null, 2)}</pre>
          {examQuestions && (
            <div>
              <h1>Exam Questions</h1>
              <pre>{JSON.stringify(examQuestions, null, 2)}</pre>
              <p>Exam creation successful!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamCreator;
