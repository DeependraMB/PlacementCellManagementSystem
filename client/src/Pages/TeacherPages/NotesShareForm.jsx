import React from 'react'
import TeacherDash from '../../Components/TeacherComponents/TeacherDash/TeacherDash'
import AddNotesForm from '../../Components/TeacherComponents/NotesShare/AddNotesForm'

function NotesShareForm() {
  return (
    <div>
        <TeacherDash>
            <AddNotesForm/>
        </TeacherDash>
    </div>
  )
}

export default NotesShareForm