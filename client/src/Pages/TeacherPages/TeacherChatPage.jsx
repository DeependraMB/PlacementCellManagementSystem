import React from 'react'
import ChatComponent from '../../Components/ChatRoom/ChatComponent';
import TeacherDash from '../../Components/TeacherComponents/TeacherDash/TeacherDash'

function TeacherChatPage() {
  return (
    <TeacherDash>
        <ChatComponent/>
    </TeacherDash>
  )
}

export default TeacherChatPage