import React from "react";
import ResumeUpload from "../../Components/StudentComponents/ResumeUpload/ResumeUpload";
import StudentDash from "../../Components/StudentComponents/StudentDash/StudentDash";

function AtsCheckerPage() {
  return (
    <div>
      <StudentDash>
        <ResumeUpload />
      </StudentDash>
    </div>
  );
}

export default AtsCheckerPage;
