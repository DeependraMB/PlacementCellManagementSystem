import React from 'react'
import StudentDash from '../../Components/StudentComponents/StudentDash/StudentDash'
import StudentNotification from '../../Components/StudentComponents/StudentNotification/StudentNotification'

function StudentNotificationPage() {
  return (
    <StudentDash>
        <StudentNotification/>
    </StudentDash>
  )
}

export default StudentNotificationPage