import React from 'react'
import ChatComponent from '../../Components/ChatRoom/ChatComponent';
import StudentDash from '../../Components/StudentComponents/StudentDash/StudentDash'

function StudentChatPage() {
  return (
    <StudentDash>
        <ChatComponent/>
    </StudentDash>
  )
}

export default StudentChatPage