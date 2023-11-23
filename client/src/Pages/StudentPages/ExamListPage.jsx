import React from 'react'
import StudentDash from "../../Components/StudentComponents/StudentDash/StudentDash";
import StudentExamList from "../../Components/AptitudeExam/ExamList/StudentExamList";

function StudentExamListPage() {
  return (
    <div>
        <StudentDash>
          <StudentExamList/>
        </StudentDash>
    </div>
  )
}

export default StudentExamListPage