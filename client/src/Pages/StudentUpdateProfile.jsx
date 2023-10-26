import React from "react";
import StudentDash from "../Components/StudentComponents/StudentDash/StudentDash";
import Stepper from "../Components/StudentComponents/Stepper/Stepper";
import Navbar2 from "../Components/Navbar/Navbar2";

function StudentUpdateProfile() {
  return (
    <div>
      <StudentDash>
        <Stepper />
      </StudentDash>
    </div>
  );
}

export default StudentUpdateProfile;
