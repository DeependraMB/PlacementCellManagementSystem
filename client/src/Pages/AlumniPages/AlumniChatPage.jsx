import React from 'react'
import ChatComponent from '../../Components/ChatRoom/ChatComponent'
import AlumniDash from '../../Components/AlumniComponent/AlumniDash/AlumniDash'

function AlumniChatPage() {
  return (
    <AlumniDash>
        <ChatComponent/>
    </AlumniDash>
  )
}

export default AlumniChatPage