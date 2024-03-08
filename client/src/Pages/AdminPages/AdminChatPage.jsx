import React from "react";
import ChatComponent from "../../Components/ChatRoom/ChatComponent";
import AdminDash from "../../Components/AdminComponents/AdminDash/AdminDash";

function AdminChatPage() {
  return (
    <AdminDash>
      <ChatComponent />
    </AdminDash>
  );
}

export default AdminChatPage;
