import React from 'react'
import AdminDash from '../../Components/AdminComponents/AdminDash/AdminDash';
import AdminNotification from '../../Components/AdminComponents/AdminNotification/AdminNotifications'

function AdminNotificationPage() {
  return (
    <AdminDash>
        <AdminNotification/>
    </AdminDash>
  )
}

export default AdminNotificationPage