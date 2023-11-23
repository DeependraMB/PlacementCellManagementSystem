import React from 'react'
import StudentDash from '../../Components/StudentComponents/StudentDash/StudentDash'
import StudentExamResult from "../../Components/AptitudeExam//ConductExam//StudentExamResult"

function StudentExamResultPage() {
  return (
    <div>
        <StudentDash>
            <StudentExamResult/>
        </StudentDash>
    </div>
  )
}

export default StudentExamResultPage