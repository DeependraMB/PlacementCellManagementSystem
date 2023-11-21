import React from 'react'
import TeacherDash from '../../Components/TeacherComponents/TeacherDash/TeacherDash'
import ExamCreatorForm from '../../Components/AptitudeExam/CreateExam/ExamCreatorForm'

function CreateExamPage() {
  return (
    <div>
        <TeacherDash>
            <ExamCreatorForm/>
        </TeacherDash>
    </div>
  )
}

export default CreateExamPage