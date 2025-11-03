import { Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
      <Button size="icon" variant="ghost" onClick={onMenuClick}>
        <Menu className="w-6 h-6" />
      </Button>
      <div className="flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-display font-bold">Chat Nexus</h1>
      </div>
      <div className="w-10" /> {/* Spacer for centering */}
    </div>
  );
};
