import React from 'react'
import ChatComponent from '../Components/ChatRoom/ChatComponent'
import AdminDash from '../Components/AdminComponents/AdminDash/AdminDash'

function ChatPage() {
  return (
    <div>
        <AdminDash>

        <ChatComponent/>
        </AdminDash>
    </div>
  )
}

export default ChatPage