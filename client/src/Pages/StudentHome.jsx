import React from "react";
import StudentDash from "../Components/StudentComponents/StudentDash/StudentDash";
import StudentHomeBoxes from "../Components/StudentComponents/StudentHomeBoxes/StudentHomeBoxes";

function StudentHome() {
  return (
    <StudentDash>
      <StudentHomeBoxes/>
    </StudentDash>
  );
}

export default StudentHome;
