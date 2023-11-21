import React from 'react'
import TeacherDash from '../../Components/TeacherComponents//TeacherDash/TeacherDash'
import ExamList from '../../Components/AptitudeExam/ExamList/ExamList'

function ExamListPage() {
  return (
    <div>
        <TeacherDash>
          <ExamList/>
        </TeacherDash>
    </div>
  )
}

export default ExamListPage