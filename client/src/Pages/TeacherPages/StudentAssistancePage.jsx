import React from 'react'
import TeacherDash from '../../Components/TeacherComponents/TeacherDash/TeacherDash'
import StudentAssistance from '../../Components/TeacherComponents/StudentAssistance/StudentAssistance'


function StudentAssistancePage() {
  return (
    <div>
        <TeacherDash>
            <StudentAssistance/>
        </TeacherDash>
    </div>
  )
}

export default StudentAssistancePage