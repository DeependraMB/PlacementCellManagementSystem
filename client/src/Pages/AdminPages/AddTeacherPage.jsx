import React from 'react'
import AdminDash from '../../Components/AdminComponents/AdminDash/AdminDash'
import AddTeacherForm from '../../Components/AdminComponents/AddTeacherForm/AddTeacherForm'

function AddTeacherPage() {
  return (
    <div>
        <AdminDash>
            <AddTeacherForm/>
        </AdminDash>
    </div>
  )
}

export default AddTeacherPage