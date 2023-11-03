import React from 'react'
import AdminDash from '../../Components/AdminComponents/AdminDash/AdminDash'
import NotesManagement from '../../Components/AdminComponents/NotesManagement/NotesManagement'


function NotesManagementPage() {
  return (
    <div>
        <AdminDash>
            <NotesManagement/>
        </AdminDash>
    </div>
  )
}

export default NotesManagementPage