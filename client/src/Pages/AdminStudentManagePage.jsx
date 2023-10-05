import React from 'react'
import AdminDash from "../Components/AdminComponents/AdminDash/AdminDash"
import StudentManagement from "../Components/AdminComponents/StudentManagement/StudentManagement"

function AdminStudentManagePage() {
  return (
    <AdminDash>
        <StudentManagement/>
    </AdminDash>
  )
}

export default AdminStudentManagePage