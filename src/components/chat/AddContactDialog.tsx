import { useState } from "react";
import { Search, Users, UserPlus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for demo
const searchResults = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
];

const contacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "2",
    name: "Mike Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

export const AddContactDialog = ({ open, onOpenChange }: AddContactDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">New Chat</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Contact
            </TabsTrigger>
            <TabsTrigger value="group" className="gap-2">
              <Users className="w-4 h-4" />
              Create Group
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <Button size="sm">Add</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Members ({selectedMembers.length})</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => toggleMember(contact.id)}
                  >
                    <Checkbox
                      checked={selectedMembers.includes(contact.id)}
                      onCheckedChange={() => toggleMember(contact.id)}
                    />
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm flex-1">{contact.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!groupName.trim() || selectedMembers.length === 0}
            >
              Create Group
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
