import React from 'react'
import TeacherDash from '../../Components/TeacherComponents/TeacherDash/TeacherDash'
import TeacherHomeBoxes from '../../Components/TeacherComponents/TeacherHomeBoxes/TeacherHomeBoxes'

function TeacherHome() {
  return (
    <div>
      <TeacherDash>
        <TeacherHomeBoxes/>
      </TeacherDash>
    </div>
  )
}

export default TeacherHome