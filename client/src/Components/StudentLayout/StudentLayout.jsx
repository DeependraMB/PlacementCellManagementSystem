import React from "react";
import StudentDash from "../StudentDash/StudentDash";

function StudentLayout(props) {
  return (
   
      <StudentDash>
        <main>{props.childeren}</main>
      </StudentDash>
   
  );
}

export default StudentLayout;
