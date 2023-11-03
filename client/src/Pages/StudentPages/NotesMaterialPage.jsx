import React from 'react'
import StudentDash from '../../Components/StudentComponents/StudentDash/StudentDash'
import NotesMaterial from '../../Components/StudentComponents/NotesMaterial/NotesMaterial'

function NotesMaterialPage() {
  return (
    <div>
        <StudentDash>
            <NotesMaterial/>
        </StudentDash>
    </div>
  )
}

export default NotesMaterialPage