import React from 'react'
import JobManagement from "../../Components/AdminComponents/JobManagement/JobManagement"
import AdminDash from "../../Components/AdminComponents/AdminDash/AdminDash"

function JobApprovalPage() {
  return (
    <AdminDash>
       <JobManagement/>
    </AdminDash>
  )
}

export default JobApprovalPage