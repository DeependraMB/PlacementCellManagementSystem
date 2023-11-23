import React from 'react'
import StudentDash from '../../Components/StudentComponents/StudentDash/StudentDash'
import Examination from "../../Components/AptitudeExam/ConductExam/Examination"

function ConductExamPage() {
  return (
    <div>
        <StudentDash>
            <Examination/>
        </StudentDash>
    </div>
  )
}

export default ConductExamPage