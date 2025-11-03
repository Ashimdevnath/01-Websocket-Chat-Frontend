import { useState } from "react";
import { Send, Smile, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  selectedChat: string | null;
}

// Mock messages
const messages = [
  {
    id: "1",
    text: "Hey! How are you doing?",
    sender: "other",
    time: "10:30 AM",
  },
  {
    id: "2",
    text: "I'm doing great! Just working on the new project. How about you?",
    sender: "me",
    time: "10:32 AM",
  },
  {
    id: "3",
    text: "That's awesome! I'd love to hear more about it.",
    sender: "other",
    time: "10:33 AM",
  },
  {
    id: "4",
    text: "Sure! It's a chat application demo. The UI is looking really nice!",
    sender: "me",
    time: "10:35 AM",
  },
];

export const ChatWindow = ({ selectedChat }: ChatWindowProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center opacity-20">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Select a Chat
          </h3>
          <p className="text-muted-foreground">
            Choose a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Chat Header */}
      <div className="hidden md:flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Sarah Johnson</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Phone className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2 shadow-soft",
                msg.sender === "me"
                  ? "bg-gradient-to-br from-primary to-primary-glow text-white rounded-br-sm"
                  : "bg-card text-foreground rounded-bl-sm border border-border"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  msg.sender === "me" ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="shrink-0">
            <Smile className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost" className="shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            className="shrink-0 bg-gradient-to-br from-primary to-accent hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
