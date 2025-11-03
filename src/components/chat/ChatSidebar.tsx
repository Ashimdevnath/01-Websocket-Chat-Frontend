import { useState } from "react";
import { Search, Plus, Bell, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AddContactDialog } from "./AddContactDialog";

interface ChatSidebarProps {
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for demo
const chats = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Hey! How are you doing?",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Tech Team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
    lastMessage: "Meeting at 3 PM",
    time: "1h ago",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: "3",
    name: "Mike Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "Thanks for the help!",
    time: "3h ago",
    unread: 0,
    online: false,
  },
];

const invites = [
  {
    id: "inv-1",
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    mutualFriends: 5,
  },
  {
    id: "inv-2",
    name: "Alex Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    mutualFriends: 3,
  },
];

export const ChatSidebar = ({ selectedChat, onSelectChat, isOpen, onClose }: ChatSidebarProps) => {
  const [showInvites, setShowInvites] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-full sm:w-96 bg-card border-r border-border flex flex-col transition-transform duration-300",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold">Chats</h2>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="relative"
                onClick={() => setShowInvites(!showInvites)}
              >
                <Bell className="w-5 h-5" />
                {invites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-xs">
                    {invites.length}
                  </Badge>
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Invites Panel */}
        {showInvites && (
          <div className="p-4 bg-secondary/50 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Friend Requests
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowInvites(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {invites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-card"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={invite.avatar} />
                    <AvatarFallback>{invite.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{invite.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {invite.mutualFriends} mutual friends
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" className="h-8 text-xs">
                      Accept
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "w-full p-4 flex items-center gap-3 hover:bg-secondary/50 transition-colors border-b border-border/50",
                selectedChat === chat.id && "bg-secondary"
              )}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate flex items-center gap-2">
                    {chat.name}
                    {chat.isGroup && <Users className="w-3 h-3 text-muted-foreground" />}
                  </h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="ml-2 bg-primary text-xs">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AddContactDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </>
  );
};
