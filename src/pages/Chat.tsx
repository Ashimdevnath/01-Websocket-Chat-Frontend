import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { MobileHeader } from "@/components/chat/MobileHeader";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar - WhatsApp style */}
      <ChatSidebar
        selectedChat={selectedChat}
        onSelectChat={(id) => {
          setSelectedChat(id);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Chat Window */}
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
};

export default Chat;
