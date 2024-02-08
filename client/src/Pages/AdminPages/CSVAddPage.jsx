import React from 'react'
import AdminDash from '../../Components/AdminComponents/AdminDash/AdminDash'
import CSVAddAlumni from '../../Components/AdminComponents/AddAlumniForm/CSVAddAlumni'

function CSVAddPage() {
  return (
    <div>
        <AdminDash>
            <CSVAddAlumni/>
        </AdminDash>
    </div>
  )
}

export default CSVAddPage