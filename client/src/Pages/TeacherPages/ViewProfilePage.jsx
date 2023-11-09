import React from 'react'
import TeacherDash from "../../Components/TeacherComponents/TeacherDash/TeacherDash"
import ViewProfile from "../../Components/TeacherComponents/ViewProfile/ViewProfile"

function ViewProfilePage() {
  return (
    <div>
        <TeacherDash>
            <ViewProfile/>
        </TeacherDash>
    </div>
  )
}

export default ViewProfilePage