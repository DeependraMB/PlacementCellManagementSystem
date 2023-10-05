import React from "react";
import StudentLayout from "../Components/StudentLayout/StudentLayout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SignUpForm from "../Components/SignUpForm/SignUpForm";
import StudentDash from "../Components/StudentDash/StudentDash";
import SignUpPage from "./SignUpPage";
import Features from "../Components/Features/Features";
import StudentHomeBoxes from "../Components/StudentHomeBoxes/StudentHomeBoxes";

function StudentHome() {
  return (
    <StudentDash>
      <StudentHomeBoxes/>
    </StudentDash>
  );
}

export default StudentHome;
